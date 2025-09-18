export interface MfaData {
  secret: string;
  qrCodeDataURL: string;
}

export interface MfaEnrollResponse {
  message: string;
  success: boolean;
  data: MfaData;
  timestamp: string;
}

export interface MfaVerifyResponse {
  message: string;
  success: boolean;
  data: {
    recoveryPhrases: string[];
    enabled: boolean;
  };
  timestamp: string;
}

export interface MfaDisableResponse {
  message: string;
  success: boolean;
  timestamp: string;
}
