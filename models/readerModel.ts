type cat = {
  cat_id: string;
  desc_cat: string;
  dias_limite: number;
}

export class ReaderModel {
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  tel: string;
  email: string;
  doc_id: string;
  dt_nasc: Date;
  categoria: cat;
}