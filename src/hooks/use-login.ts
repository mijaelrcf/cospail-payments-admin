import { useMutation } from '@tanstack/react-query'
import { login } from '../api/admin'

export const useLogin = () => {
  return useMutation({ mutationFn: login })
}