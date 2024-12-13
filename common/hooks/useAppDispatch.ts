import {useDispatch} from 'react-redux'
import type {AppDispatch} from '../../src/app/store.ts'


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()