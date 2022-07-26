function onEdit(e) {
  if (e.range.getA1Notation() == 'B2' && e.value != undefined) {
      console.log('e.value: ' + e.value)

    // /regex/.test(e.value): 누군가가 B2 셀에 넣은 악성 코드를 실행하고 있지 않은지 확인하는 것
    if (/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*/.test(e.value)) {
      // eval(e.value)(): 함수를 호출하면 B2에 적힌 문자열로 이름되어 있는 function이 실행됨.
      eval(e.value)();
      e.range.clear();
    }
    else {
      console.log('else e.value: ' + e.value)
      console.log('else e.range.getA1Notation(): ' + e.range.getA1Notation())
    }
  }
}

function 검색() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('검색기');

  sheet.getRange('C2').setValue('검색 중...');
  findWord()
  sheet.getRange('C2').clear();
}

function 결과지우기() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('검색기');

  sheet.getRange('B2').clear();
  sheet.getRange('C2').clear();
  clearResultContents(sheet);
}


function findWord() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();
  var sheet = SpreadsheetApp.getActive().getSheetByName('검색기');

  var word = sheet.getRange(2,1).getValue().toString().trim();
  var x = 9, y = 1;
  var contentsRow;
  
  console.log("wording... " + word)
  clearResultContents(sheet);

  for(var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() == sheet.getName()) continue;

    var rangeAry = sheets[i].createTextFinder(word).findAll();

      for(var j = 0; j < rangeAry.length; j++, x++) {
        contentsRow = rangeAry[j].getRow()

        sheet.getRange(x, y).setValue(contentsRow);
        sheet.getRange(x, y+1).setValue(rangeAry[j].getSheet().getName());
        sheet.getRange(x, y+2).setValue(getContents(contentsRow, rangeAry[j].getSheet()));

        console.log(
          "Row: " + 
          rangeAry[j].getRow() + 
          "\tSheetName: " + 
          rangeAry[j].getSheet().getName()
          )
      }
  }

  sheet.getRange(x, y).setValue("검색 결과 \t\t\t\t\t\t\t\t\t\t\t\t 총 " + (x - 9) + "개");

}

function getContents(row, sheetObj) {
  return sheetObj.getRange(row, 2).getValue();
}

function clearResultContents(sheetObj) {
  var x = 9;

  sheetObj.getRange('A'+ x + ':' + 'C999').clear();
  console.log('clear finish.')
}

