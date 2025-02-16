import { api } from '@/lib/axios';
import { TUserRegisterSchema } from '@/schemas';

export const userRegister = async (values: TUserRegisterSchema) => {
  try {
    const res = await api.post('/users/register-user', values);
    // console.log(res);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
