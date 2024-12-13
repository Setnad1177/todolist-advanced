import {useSelector} from 'react-redux'
import type {RootState} from '../../src/app/store.ts'

export const useAppSelector = useSelector.withTypes<RootState>()