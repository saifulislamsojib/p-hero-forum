import User from "@/types/User";
import { requests } from "./httpService";

interface LoginBody {
  email: string;
  password: string;
}

interface SignupBody extends LoginBody {
  name: string;
  role: string;
  batch?: string;
}

class AuthService {
  login(body: LoginBody): Promise<
    | {
        auth: User;
        token: string;
        message: string;
      }
    | { error: string }
  > {
    return requests.post("/auth/login", body);
  }

  signup(body: SignupBody): Promise<
    | {
        auth: User;
        token: string;
        message: string;
      }
    | { errors: Partial<SignupBody> }
  > {
    return requests.post("/auth/registration", body);
  }

  logout(): Promise<{
    message: string;
  }> {
    return fetch("/api/auth").then((res) => res.json());
  }

  currentUser(): Promise<{
    auth?: User;
    message?: string;
  }> {
    return requests.get("/auth");
  }
}

const authService = new AuthService();
export default authService;
