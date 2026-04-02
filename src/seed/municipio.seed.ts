import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MunicipioService } from '../municipio/municipio.service';

@Injectable()
export class MunicipioSeed  {
  constructor(private readonly municipioService: MunicipioService) {}

  async seed() {
    const municipios = [
      { nombre: 'ALMAGUER' },
      { nombre: 'ARGELIA' },
      { nombre: 'BALBOA' },
      { nombre: 'BOLIVAR' },
      { nombre: 'BUENOS AIRES' },
      { nombre: 'CAJIBIO' },
      { nombre: 'CALDONO' },
      { nombre: 'CALOTO' },
      { nombre: 'CORINTO' },
      { nombre: 'EL TAMBO' },
      { nombre: 'FLORENCIA' },
      { nombre: 'GUACHENÉ' },
      { nombre: 'GUAPI' },
      { nombre: 'INZA' },
      { nombre: 'JAMBALÓ' },
      { nombre: 'LA SIERRA' },
      { nombre: 'LA VEGA' },
      { nombre: 'LÓPEZ DE MICAY' },
      { nombre: 'MERCADERES' },
      { nombre: 'MIRANDA' },
      { nombre: 'MORALES' },
      { nombre: 'PADILLA' },
      { nombre: 'PÁEZ' },
      { nombre: 'PATIA' },
      { nombre: 'PIAMONTE' },
      { nombre: 'PIENDAMO' },
      { nombre: 'POPAYAN' },
      { nombre: 'PUERTO TEJADA' },
      { nombre: 'PURACE' },
      { nombre: 'ROSAS' },
      { nombre: 'SAN SEBASTIAN' },
      { nombre: 'SANTA ROSA' },
      { nombre: 'SANTANDER DE QUILICHAO' },
      { nombre: 'SILVIA' },
      { nombre: 'SOTARA' },
      { nombre: 'SUAREZ' },
      { nombre: 'SUCRE' },
      { nombre: 'TIMBIO' },
      { nombre: 'TIMBIQUI' },
      { nombre: 'TORIBIO' },
      { nombre: 'TOTORO' },
      { nombre: 'VILLA RICA' },
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