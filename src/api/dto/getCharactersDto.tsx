import { Character } from "../../models/character"

export interface GetCharactersResponse {
    data: {
        results: Character[]
    }
}

export interface GetCharactersRequest {
    events: number[],
    series: number[],
    comics: number[]
}