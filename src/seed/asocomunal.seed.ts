import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AsocomunalService } from '../asocomunal/fachadaService/asocomunal.service';

@Injectable()
export class AsocomunalSeed  {
  constructor(
    private readonly asocomunalService: AsocomunalService,
  ) {}

  async seed() {
    const asocomunales = [
      { nombre: 'ASOCOMUNAL ALMAGUER', municipioId: 1, estado: true },
      { nombre: 'ASOCOMUNAL ARGELIA CABECERA', municipioId: 2, estado: true },
      { nombre: 'ASOCOMUNAL CGTOS. EL PLATEADO LA EMBOSCADA Y S.', municipioId: 2, estado: true },
      { nombre: 'ASOCOMUNAL BALBOA', municipioId: 3, estado: true },
      { nombre: 'ASOCOMUNAL BOLIVAR', municipioId: 4, estado: true },
      { nombre: 'ASOCOMUNAL BUENOS AIRES', municipioId: 5, estado: true },
      { nombre: 'ASOCOMUNAL ALTO NAYA', municipioId: 5, estado: true },
      { nombre: 'ASOCOMUNAL CAJIBIO', municipioId: 6, estado: true },
      { nombre: 'ASOCOMUNAL CALDONO', municipioId: 7, estado: true },
      { nombre: 'ASOCOMUNAL CALOTO', municipioId: 8, estado: true },
      { nombre: 'ASOCOMUNAL CORINTO', municipioId: 9, estado: true },
      { nombre: 'ASOCOMUNAL EL TAMBO', municipioId: 10, estado: true },
      { nombre: 'ASOCOMUNAL FLORENCIA', municipioId: 11, estado: false },
      { nombre: 'ASOCOMUNAL GUACHENE', municipioId: 12, estado: true },
      { nombre: 'ASOCOMUNAL GUAPI', municipioId: 13, estado: true },
      { nombre: 'ASOCOMUNAL INZA', municipioId: 14, estado: true },
      { nombre: 'ASOCOMUNAL JAMBALO', municipioId: 15, estado: true },
      { nombre: 'ASOCOMUNAL LA SIERRA', municipioId: 16, estado: true },
      { nombre: 'ASOCOMUNAL LA VEGA', municipioId: 17, estado: true },
      { nombre: 'ASOCOMUNAL LÓPEZ DE MICAY', municipioId: 18, estado: false },
      { nombre: 'ASOCOMUNAL MERCADERES', municipioId: 19, estado: true },
      { nombre: 'ASOCOMUNAL MIRANDA', municipioId: 20, estado: true },
      { nombre: 'ASOCOMUNAL MORALES', municipioId: 21, estado: true },
      { nombre: 'ASOCOMUNAL PADILLA', municipioId: 22, estado: false },
      { nombre: 'ASOCOMUNAL PAEZ', municipioId: 23, estado: true },
      { nombre: 'ASOCOMUNAL PATIA', municipioId: 24, estado: true },
      { nombre: 'ASOCOMUNAL PIAMONTE', municipioId: 25, estado: true },
      { nombre: 'ASOCOMUNAL PIENDAMO', municipioId: 26, estado: true },
      { nombre: 'ASOCOMUNAL POPAYAN', municipioId: 27, estado: true },
      { nombre: 'ASOCOMUNAL PUERTO TEJADA', municipioId: 28, estado: true },
      { nombre: 'ASOCOMUNAL PURACE', municipioId: 29, estado: true },
      { nombre: 'ASOCOMUNAL ROSAS', municipioId: 30, estado: true },
      { nombre: 'ASOCOMUNAL SAN SEBASTIAN', municipioId: 31, estado: true },
      { nombre: 'ASOCOMUNAL SANTA ROSA CABECERA', municipioId: 32, estado: true },
      { nombre: 'ASOCOMUNAL SANTA ROSA MEDIA BOTA', municipioId: 32, estado: true },
      { nombre: 'ASOCOMUNAL SANTA ROSA VILLALOBOS', municipioId: 32, estado: true },
      { nombre: 'ASOCOMUNAL SANTANDER DE QUILICHAO', municipioId: 33, estado: true },
      { nombre: 'ASOCOMUNAL SILVIA', municipioId: 34, estado: true },
      { nombre: 'ASOCOMUNAL SOTARA', municipioId: 35, estado: true },
      { nombre: 'ASOCOMUNAL SUAREZ', municipioId: 36, estado: true },
      { nombre: 'ASOCOMUNAL SUCRE', municipioId: 37, estado: true },
      { nombre: 'ASOCOMUNAL TIMBIO', municipioId: 38, estado: true },
      { nombre: 'ASOCOMUNAL TIMBIQUI', municipioId: 39, estado: false },
      { nombre: 'ASOCOMUNAL TORIBIO', municipioId: 40, estado: true },
      { nombre: 'ASOCOMUNAL TOTORO', municipioId: 41, estado: true },
      { nombre: 'ASOCOMUNAL VILLA RICA', municipioId: 42, estado: true },
    ];

    let count = 0;

    for (const a of asocomunales) {
      try {
        await this.asocomunalService.create(a);
        count++;
      } catch (error) {
        console.log(`Error con ${a.nombre}: ${error.message}`);
      }
    }

    console.log(` Seed completado: ${count} asocomunales creadas`);
  }
}