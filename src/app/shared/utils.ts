import {Item} from "./models/Banque/item";
/**
 * Created by Abbes on 30/06/2017.
 */
declare var jQuery: any;
/**
 * Created by Vyndee on 27/03/2017.
 */
export class Utils {


  public static zero(n: number) {
    if (n < 10) {
      return "0" + n;
    }
    return n;
  }

  static configDataTables() {
    jQuery.extend(jQuery.fn.dataTable.defaults, {
      autoWidth: false,
      columnDefs: [{
        orderable: false,
        width: '100px',
        targets: [5]
      }],
      dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
      language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      },
      drawCallback: function () {
        jQuery(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
      },
      preDrawCallback: function () {
        jQuery(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
      }
    });
  }

  static getCompetenceToString(items: Item[]) {
    const compt = Utils.groupBy(items, "id_Competence");
    let competenceString = "";
    Object.keys(compt).forEach(
      id_Competence => {
        competenceString += compt[id_Competence][0].competence.prefix + ",";
      }
    );

    return competenceString.substring(0, competenceString.length - 1);
  }

  private static groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
}

