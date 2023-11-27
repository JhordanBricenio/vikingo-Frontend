import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class ImprimirService {

  constructor() { }

  imprimirFactura(encabezado: string[], cuerpo: Array<any>, titulo: string, guardar?: boolean) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });

    //Si el estado es pendiente, se pinta de rojo
   console.log(cuerpo);

   for (let i = 0; i < cuerpo.length; i++) {
    if(cuerpo[i][7]!=null){
    if (cuerpo[i][7] == 'INACTIVO') {
      cuerpo[i][7] = { content: 'INACTIVO', styles: { fillColor: [255, 0, 0] } };
    }
  }
  }


    for (let i = 0; i < cuerpo.length; i++) {
      if (cuerpo[i][4]!=null) {
      if (cuerpo[i][4] == 'Pendiente') {
        cuerpo[i][4] = { content: 'Pendiente', styles: { fillColor: [255, 0, 0] } };
      }}
    }
    doc.text(titulo, doc.internal.pageSize.width / 2, 25, { align: 'center' });
    autoTable(doc, {
      columnStyles: { 0: { halign: 'center', fillColor: [204, 255, 255] } },
      margin: { top: 10 },
      head: [encabezado],
      body: cuerpo
    });

    if (guardar) {
      const hoy = new Date();
      const nombreArchivo = hoy.getFullYear() + '_' +
        ('0' + (hoy.getMonth() + 1)).slice(-2) + '_' +
        ('0' + hoy.getDate()).slice(-2) + '_' +
        hoy.getTime() + '.pdf';
      doc.save(nombreArchivo);
    }
  }


}
