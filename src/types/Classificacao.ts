type Resultado = 'V' | 'E' | 'D';

export interface Time {
    id: string;
    nome: string;
    Pts: string;
    PJ: string;
    VIT: string;
    E: string;
    DER: string;
    GP: string;
    GC: string;
    SG: string;
    Jogos: Resultado[];
    brasao: string;
}

export type Classificacao = Time[];