type cat = {
  cat_id: string;
  desc_cat: string;
  dias_limite: number;
  multa: number;
}

export class BookModel {
  isn_id: string;
  titulo: string;
  autores: string;
  plv_chave: string;
  editora: string;
  num_pag: number;
  num_ed: number;
  dt_public: number;
  emprestado: boolean;
  reservado: boolean;
  categoria: cat;
}