import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MunicipioService } from '../municipio/municipio.service';

@Injectable()
export class MunicipioSeed {
  constructor(private readonly municipioService: MunicipioService) { }

  async seed() {
    const municipios = [
      { nombre: 'Almaguer' },
      { nombre: 'Argelia' },
      { nombre: 'Balboa' },
      { nombre: 'Bolívar' },
      { nombre: 'Buenos Aires' },
      { nombre: 'Cajibío' },
      { nombre: 'Caldono' },
      { nombre: 'Caloto' },
      { nombre: 'Corinto' },
      { nombre: 'El Tambo' },
      { nombre: 'Florencia' },
      { nombre: 'Guachené' },
      { nombre: 'Guapi' },
      { nombre: 'Inzá' },
      { nombre: 'Jambaló' },
      { nombre: 'La Sierra' },
      { nombre: 'La Vega' },
      { nombre: 'López de Micay' },
      { nombre: 'Mercaderes' },
      { nombre: 'Miranda' },
      { nombre: 'Morales' },
      { nombre: 'Padilla' },
      { nombre: 'Páez' },
      { nombre: 'Patía' },
      { nombre: 'Piamonte' },
      { nombre: 'Piendamó' },
      { nombre: 'Popayán' },
      { nombre: 'Puerto Tejada' },
      { nombre: 'Puracé' },
      { nombre: 'Rosas' },
      { nombre: 'San Sebastián' },
      { nombre: 'Santa Rosa' },
      { nombre: 'Santander de Quilichao' },
      { nombre: 'Silvia' },
      { nombre: 'Sotará' },
      { nombre: 'Suárez' },
      { nombre: 'Sucre' },
      { nombre: 'Timbío' },
      { nombre: 'Timbiquí' },
      { nombre: 'Toribío' },
      { nombre: 'Totoró' },
      { nombre: 'Villa Rica' },
    ];

    for (const m of municipios) {
      const exists = await this.municipioService.findByNombre(m.nombre);

      if (!exists) {
        await this.municipioService.create(m);
      }
    }

    console.log('Municipios cargados');
  }
}
