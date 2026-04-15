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

export interface MfaStatusResponse {
  message: string;
  success: boolean;
  data: {
    enabled: boolean;
    method: "sms" | "email" | "authenticator" | null;
  };
  timestamp: string;
}

export interface ResponseRegeneration {
  message: string;
  success: boolean;
  data: {
    recoveryPhrases: string[];
  };
  timestamp: string;
}
