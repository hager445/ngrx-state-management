export interface Iuser {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'User';
    password: string;
    createdAt: string; // أو ممكن نستخدم Date لو هتعملي parsing
  }
  