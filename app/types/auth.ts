
export interface AuthRequest {
  email: "";
  passoword: "";
}

export interface AuthResponse extends AuthRequest {

}
export interface RegisterRequest {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};
