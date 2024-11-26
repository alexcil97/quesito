export type User = {
  id: string;
  nombre: string;
  apellido: string | undefined;
  profile_picture: string | null;
  role: string;
  edad: string | null;
  email: string;
  password: string;
  emailVerified: Date | null;
  createdAt: Date | null;
  isTwoFactorEnabled: boolean;
};

export type Publication = {
  id: string
  id_user: string
  publication_date: string
  publication_message: string
  user: User
  url_image: string
};
