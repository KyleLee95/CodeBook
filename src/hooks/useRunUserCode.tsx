import { trpc } from '../utils/trpc'
import { Dispatch, SetStateAction } from 'react'
export const useRunUserCode = (
  setState: Dispatch<SetStateAction<string>>,
  language: string
) => {
  const { useMutation } = trpc

  const mutation = useMutation(['codeEnvironments.runCode'], {
    onSuccess: (data) => {
      const stringResults = JSON.stringify(data?.results)
      setState(stringResults)
    },
    onMutate: () => {
      /*
        TODO:
        have some kind of running state here that creates a loading shell.
        */
    }
  })
  return mutation
}
