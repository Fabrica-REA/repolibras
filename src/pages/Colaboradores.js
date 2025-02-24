import React from 'react';
import './Colaboradores.css'

function Colabodoradores() {
  return (
    <div>
      <h1>Equipe do Repositório de Libras</h1>
      <div class="row">
      <div class="card">
    <div class="card__column">
        <img src="https://via.placeholder.com/100x150" alt="Foto 3x4" class="card__photo" />
        <h2 class="card__name">Nome da Pessoa</h2>
    </div>
    <div class="card__column">
        <ul class="card__links">
            <li><a href="https://www.lattes.com"><img src="https://via.placeholder.com/50x50" alt="Lattes" /></a></li>
            <li><a href="https://www.linkedin.com"><img src="https://via.placeholder.com/50x50" alt="LinkedIn" /></a></li>
        </ul>
        <p class="card__notes">Observações sem destaque</p>
    </div>
</div>

      </div>
    </div>
  );
}

export default Colabodoradores;
