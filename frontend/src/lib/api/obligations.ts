import { api } from './client'
import { type Obligation } from '#/utils/interfaces'

export function fetchObligations() {
    return api<Obligation[]>('/obligations')
}