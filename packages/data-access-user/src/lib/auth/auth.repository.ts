import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiClient } from '../api/api-client';
import {
  AuthErrorBody,
  AuthResponse,
  AuthenticatedUser,
  ForgotPasswordRequest,
  PasswordResetResponse,
  ResetPasswordRequest,
  SigninRequest,
  SignupRequest,
  VerifyResetCodeRequest,
  parseAuthError,
} from './auth.models';

/** Thrown for any non-2xx auth response, with the messages already parsed. */
export class AuthRequestError extends Error {
  constructor(
    readonly messages: string[],
    readonly status: number
  ) {
    super(messages[0] ?? 'Something went wrong. Please try again.');
    this.name = 'AuthRequestError';
  }
}

@Injectable({ providedIn: 'root' })
export class AuthRepository extends ApiClient<AuthenticatedUser> {
  protected readonly endpoint = 'auth';

  /** POST {baseUrl}/auth/signup */
  signup(payload: SignupRequest): Observable<AuthResponse> {
    return this.post$('signup', payload);
  }

  /** POST {baseUrl}/auth/signin */
  signin(payload: SigninRequest): Observable<AuthResponse> {
    return this.post$('signin', payload);
  }

  /** POST {baseUrl}/auth/forgotPassword */
  forgotPassword(payload: ForgotPasswordRequest): Observable<PasswordResetResponse> {
    return this.withAuthErrors(
      this.http.post<PasswordResetResponse>(`${this.resourceUrl}/forgotPassword`, payload)
    );
  }

  /** POST {baseUrl}/auth/verifyResetCode */
  verifyResetCode(payload: VerifyResetCodeRequest): Observable<PasswordResetResponse> {
    return this.withAuthErrors(
      this.http.post<PasswordResetResponse>(`${this.resourceUrl}/verifyResetCode`, payload)
    );
  }

  /** PUT {baseUrl}/auth/resetPassword */
  resetPassword(payload: ResetPasswordRequest): Observable<PasswordResetResponse> {
    return this.withAuthErrors(
      this.http.put<PasswordResetResponse>(`${this.resourceUrl}/resetPassword`, payload)
    );
  }

  private post$(
    action: 'signup' | 'signin',
    payload: SignupRequest | SigninRequest
  ): Observable<AuthResponse> {
    return this.withAuthErrors(
      this.http.post<AuthResponse>(`${this.resourceUrl}/${action}`, payload)
    );
  }

  private withAuthErrors<T>(request: Observable<T>): Observable<T> {
    return request.pipe(catchError((error) => throwError(() => this.toAuthError(error))));
  }

  private toAuthError(error: unknown): AuthRequestError {
    if (!(error instanceof HttpErrorResponse)) {
      return new AuthRequestError(['Unexpected error. Please try again.'], 0);
    }

    const messages = parseAuthError(error.error as AuthErrorBody);

    // A 5xx body carries the server's own exception text (e.g. a Node
    // TypeError), which means nothing to the user.
    if (messages.length && error.status >= 500) {
      return new AuthRequestError(
        ['Something went wrong on our side. Please try again later.'],
        error.status
      );
    }

    if (messages.length) {
      return new AuthRequestError(messages, error.status);
    }

    // Network failures and gateway errors arrive with no parseable body.
    return new AuthRequestError(
      [
        error.status === 0
          ? 'Cannot reach the server. Check your connection.'
          : `Request failed (${error.status}). Please try again.`,
      ],
      error.status
    );
  }
}
