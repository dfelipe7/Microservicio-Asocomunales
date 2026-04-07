import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AsocomunalService } from '../asocomunal/fachadaService/asocomunal.service';

@Injectable()
export class AsocomunalSeed  {
  constructor(
    private readonly asocomunalService: AsocomunalService,
  ) {}

  async seed() {
    const asocomunales = [
  { nombre: 'ASOCOMUNAL ALMAGUER', municipioId: 1, estado: true, presidente: 'CARLOS HOYOS RUANO', telefono: '3208932387', correo: 'asociacioncomunalalmaguer@gmail.com' },

  { nombre: 'ASOCOMUNAL ARGELIA CABECERA', municipioId: 2, estado: true, presidente: 'EYDER MUÑOZ ROSERO', telefono: '3117115155', correo: 'asocomunalargelia74@gmail.com' },

  { nombre: 'ASOCOMUNAL CGTOS. EL PLATEADO LA EMBOSCADA Y S.', municipioId: 2, estado: true, presidente: 'ELIVER ARBOLEDA BERMUDEZ', telefono: '3187421622', correo: 'promotoriargeliacauca@gmail.com;promotoriadejuntas@argelia-cauca.gov.co' },

  { nombre: 'ASOCOMUNAL BALBOA', municipioId: 3, estado: true, presidente: 'ANDRES FELIPE SUAREZ DORADO', telefono: '3106153184', correo: 'asocomunalbalboa@gmail.com' },

  { nombre: 'ASOCOMUNAL BOLIVAR', municipioId: 4, estado: true, presidente: 'FREDY YOBANY ZEMANATE', telefono: '3122871156', correo: 'asocomunalbolivarc@hotmail.com' },

  { nombre: 'ASOCOMUNAL BUENOS AIRES', municipioId: 5, estado: true, presidente: 'MANUEL CORTES SALINAS', telefono: '3146436320', correo: 'asocomunalbuenosaires2225@gmail.com' },

  { nombre: 'ASOCOMUNAL ALTO NAYA', municipioId: 5, estado: true, presidente: 'MANUEL TENORIO YONDA', telefono: '3027830505;3153933757', correo: 'desarrollocomunitario@buenosaires-cauca.gov.co;greysigomez1986@gmail.com' },

  { nombre: 'ASOCOMUNAL CAJIBIO', municipioId: 6, estado: true, presidente: 'MARGARETT GARCIA GUARDO', telefono: '3137486215', correo: 'asocomunalcajibio@gmail.com' },

  { nombre: 'ASOCOMUNAL CALDONO', municipioId: 7, estado: true, presidente: 'SILVIO BOMBA CAMPO', telefono: '3104337775', correo: 'asocomunalcaldonocauca@gmail.com' },

  { nombre: 'ASOCOMUNAL CALOTO', municipioId: 8, estado: true, presidente: 'OSWALDO VELASCO DAZA', telefono: '3216455133', correo: 'asoc.caloto@hotmail.com' },

  { nombre: 'ASOCOMUNAL CORINTO', municipioId: 9, estado: true, presidente: 'VILMA LORENA MOTTA', telefono: '3148856543', correo: 'jacasocomunalcorinto@gmail.com' },

  { nombre: 'ASOCOMUNAL EL TAMBO', municipioId: 10, estado: true, presidente: 'JESUS ANTONIO CAICEDO', telefono: '3126004342', correo: 'asocomunaleltambocauca@gmail.com' },

  { nombre: 'ASOCOMUNAL FLORENCIA', municipioId: 11, estado: false, presidente: 'NO ELIGIO', telefono: null, correo: null },

  { nombre: 'ASOCOMUNAL GUACHENE', municipioId: 12, estado: true, presidente: 'OSCAR CANTOÑI MINA', telefono: '3207092039', correo: 'asocomunalg@gmail.com' },

  { nombre: 'ASOCOMUNAL GUAPI', municipioId: 13, estado: true, presidente: 'DANIEL SOLÍS SINISTERRA', telefono: '3136088967', correo: 'asocomunalguapi@gmail.com' },

  { nombre: 'ASOCOMUNAL INZA', municipioId: 14, estado: true, presidente: 'ASTRID SANCHEZ CAMPOS', telefono: '3133150133', correo: 'asocomunalinzacauca@gmail.com' },

  { nombre: 'ASOCOMUNAL JAMBALO', municipioId: 15, estado: true, presidente: 'BRANDON VELASCO VALENCIA', telefono: '3206838330', correo: 'asocomunal.jambalo@gmail.com' },

  { nombre: 'ASOCOMUNAL LA SIERRA', municipioId: 16, estado: true, presidente: 'HERIBERTO LÓPEZ ALBÁN', telefono: '3113538554', correo: 'asocomunallasierra@gmail.com' },

  { nombre: 'ASOCOMUNAL LA VEGA', municipioId: 17, estado: true, presidente: 'MANCER GERARDO MUÑOZ', telefono: '3175584072', correo: 'asocomunallavega@gmail.com' },

  { nombre: 'ASOCOMUNAL LÓPEZ DE MICAY', municipioId: 18, estado: false, presidente: 'NO ELIGIO', telefono: null, correo: null },

  { nombre: 'ASOCOMUNAL MERCADERES', municipioId: 19, estado: true, presidente: 'ENRIQUE ALDIVAR ANGULO VELASCO', telefono: '3207402971', correo: 'asocomunal.mercaderes2022@gmail.com' },

  { nombre: 'ASOCOMUNAL MIRANDA', municipioId: 20, estado: true, presidente: 'MARTHA CECILIA VALENCIA CABEZAS', telefono: '3117965806', correo: 'asocomunaldemirada@gmail.com' },

  { nombre: 'ASOCOMUNAL MORALES', municipioId: 21, estado: true, presidente: 'LUIS EDUARDO VALENCIA VERGARA', telefono: '3103734753', correo: 'desarrollocomunitario@morales-cauca.gov.co' },

  { nombre: 'ASOCOMUNAL PADILLA', municipioId: 22, estado: false, presidente: null, telefono: null, correo: null },

  { nombre: 'ASOCOMUNAL PAEZ', municipioId: 23, estado: true, presidente: 'CELESTINO ORTIZ MERA', telefono: '3113789142', correo: 'asocomunalpaezcauca@hotmail.com' },

  { nombre: 'ASOCOMUNAL PATIA', municipioId: 24, estado: true, presidente: 'MARIA DEL PILAR LOPEZ HERRERA', telefono: '3127888725', correo: 'secretariaasojuntaspatia@gmail.com;presidenciaasojuntas@gmail.com' },

  { nombre: 'ASOCOMUNAL PIAMONTE', municipioId: 25, estado: true, presidente: 'GILDARDO PASTRANA', telefono: '3115324001', correo: 'asocomunalpiamonte@gmail.com' },

  { nombre: 'ASOCOMUNAL PIENDAMO', municipioId: 26, estado: true, presidente: 'JOSE AYMER MOSQUERA RAMIREZ', telefono: '3113293768', correo: 'piendamoasocomunal@gmail.com' },

  { nombre: 'ASOCOMUNAL POPAYAN', municipioId: 27, estado: true, presidente: 'JHONATAN CONSTAIN', telefono: '3122639348', correo: 'asocomunalpopayancauca@gmail.com' },

  { nombre: 'ASOCOMUNAL PUERTO TEJADA', municipioId: 28, estado: true, presidente: 'CARLOS ARTURO LASSO VASQUEZ', telefono: '3184212320', correo: 'ptotejadaasojuntas@gmail.com' },

  { nombre: 'ASOCOMUNAL PURACE', municipioId: 29, estado: true, presidente: 'OSCAR JOEL CUCHUMBE CHANTRE', telefono: '3216410316', correo: 'juntaspurace@gmail.com' },

  { nombre: 'ASOCOMUNAL ROSAS', municipioId: 30, estado: true, presidente: 'EDUARDO NARVAEZ', telefono: '3216410316', correo: 'asocomunalrosas@gmail.com;asocomunalrosascauca2023@hotmail.com' },

  { nombre: 'ASOCOMUNAL SAN SEBASTIAN', municipioId: 31, estado: true, presidente: 'FELIO ROLDAN TIMANA ANACONA', telefono: '3206995085', correo: 'contador1@caminosdeoportunidades.com.co;jesusarbeym2@hotmail.com' },

  { nombre: 'ASOCOMUNAL SANTA ROSA CABECERA', municipioId: 32, estado: true, presidente: 'NELSON JOAQUI', telefono: '3148570441', correo: 'asojuntassantarosacabecera25@gmail.com' },

  { nombre: 'ASOCOMUNAL SANTA ROSA MEDIA BOTA', municipioId: 32, estado: true, presidente: 'EDELMO CALVAHCE', telefono: '3212476240', correo: 'asojuntassantarosacabecera25@gmail.com' },

  { nombre: 'ASOCOMUNAL SANTA ROSA VILLALOBOS', municipioId: 32, estado: true, presidente: 'ALEJANDRO PIAMBA JIMENEZ', telefono: '3213418027', correo: 'asojuntasvillaloboscauca@gmail.com' },

  { nombre: 'ASOCOMUNAL SANTANDER DE QUILICHAO', municipioId: 33, estado: true, presidente: 'JESSICA LASSO CHOCO', telefono: '3113643059', correo: 'asocomunalquilichao@gmail.com' },

  { nombre: 'ASOCOMUNAL SILVIA', municipioId: 34, estado: true, presidente: 'WILSON FERNEY CHILO PITO', telefono: '3216413372', correo: 'asocomunalsilviacauca@gmail.com' },

  { nombre: 'ASOCOMUNAL SOTARA', municipioId: 35, estado: true, presidente: 'VILMA YAMILETH ASTAIZA RIVERA', telefono: '3184512686', correo: 'sotaraasociaciondejuntas@gmail.com' },

  { nombre: 'ASOCOMUNAL SUAREZ', municipioId: 36, estado: true, presidente: 'GERSAIN SOSCUE ZAMBRANO', telefono: '3174914030', correo: 'asojuntassuarez@gmail.com' },

  { nombre: 'ASOCOMUNAL SUCRE', municipioId: 37, estado: true, presidente: 'LORENA CARVAJAL MARTINEZ', telefono: '3108218229', correo: 'asocomunalsucre2023@gmail.com' },

  { nombre: 'ASOCOMUNAL TIMBIO', municipioId: 38, estado: true, presidente: 'ALFONSO TRUQUE DIAZ', telefono: '3127029949', correo: 'asocomunal.timbiocauca@gmail.com' },

  { nombre: 'ASOCOMUNAL TIMBIQUI', municipioId: 39, estado: false, presidente: 'NO ELIGIO', telefono: null, correo: null },

  { nombre: 'ASOCOMUNAL TORIBIO', municipioId: 40, estado: true, presidente: 'LIRIO VELEZ NOSCUE MIJERA', telefono: '3207441313', correo: 'asociacionjactoribio@gmail.com' },

  { nombre: 'ASOCOMUNAL TOTORO', municipioId: 41, estado: true, presidente: 'MARLENY ESTELA IBARRA M.', telefono: '3114831001', correo: 'asocomunaltotoro2026@outlook.com' },

  { nombre: 'ASOCOMUNAL VILLA RICA', municipioId: 42, estado: true, presidente: 'JHOAN A. MONTES USME', telefono: '3216134066', correo: 'asocomunalvillarica@hotmail.com' },
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

    console.log(`${count} asocomunales creadas`);
  }
}