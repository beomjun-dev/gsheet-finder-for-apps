function onEdit(e) {

  if (e.range.getA1Notation() == 'A2' && e.value != undefined) {
    console.log('A2 Edited:  ' + e.value)
    e.source.setActiveSelection(e.range.offset(0, 1));
  }
  
  if (e.range.getA1Notation() == 'B2' && e.value != undefined) {
      console.log('e.value: ' + e.value)

    // /regex/.test(e.value): 누군가가 B2 셀에 넣은 악성 코드를 실행하고 있지 않은지 확인하는 것
    if (/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*/.test(e.value)) {
      // eval(e.value)(): 함수를 호출하면 B2에 적힌 문자열로 이름되어 있는 function이 실행됨.
      eval('검색')();
      e.range.clear();
    }
    else {
      console.log('else e.value: ' + e.value)
      console.log('else e.range.getA1Notation(): ' + e.range.getA1Notation())
    }

    e.source.setActiveSelection(e.range.offset(0, -1));
  }
  
  if (e.range.getA1Notation() == 'B4' && e.value != undefined) {
      console.log('e.value: ' + e.value)

    // /regex/.test(e.value): 누군가가 B2 셀에 넣은 악성 코드를 실행하고 있지 않은지 확인하는 것
    if (/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*/.test(e.value)) {
      // eval(e.value)(): 함수를 호출하면 B2에 적힌 문자열로 이름되어 있는 function이 실행됨.
      eval('결과지우기')();
      e.range.clear();
    }
    else {
      console.log('else e.value: ' + e.value)
      console.log('else e.range.getA1Notation(): ' + e.range.getA1Notation())
    }

    e.source.setActiveSelection(e.range.offset(-2, -1));
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

function createHyperlinkgoToSheet(count) {
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var targetRange = activeSheet.getRange('D9');
  var targetX = targetRange.getRow();
  var targetY = targetRange.getColumn();
  
  if(count >= 0) {
    for(var i = targetX; i < targetX + count; i++) {
      
      var linkedSheet = SpreadsheetApp.getActive().getSheetByName(
        activeSheet.getRange(i, targetY - 2).getValue());
      
      var gid = linkedSheet.getSheetId();
      // 해당 Contents가 적힌 Cell Notation. (B + Row Number)
      var linkedCellNotation = 'B' + activeSheet.getRange(i, targetY - 3).getValue();
      
      activeSheet.getRange(i, targetY)
      .setValue('=hyperlink("#gid=' + gid + "&range=" + linkedCellNotation + '","시트로 이동")');
    }
  }
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
    
    var lastRowNum = sheets[i].getLastRow();
    if(lastRowNum == 0) continue;
    
    var range = sheets[i].getRange(3, 2, lastRowNum, 1);
    var rangeAry = range.createTextFinder(word).findAll();

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
  
  // D열에 검색결과에 해당하는 시트의 행으로 이동하는 링크를 만든다.
  createHyperlinkgoToSheet(x - 9);

  sheet.getRange(x, y).setValue("검색 결과 \t\t\t\t\t\t\t\t\t\t\t\t 총 " + (x - 9) + "개");

}

function getContents(row, sheetObj) {
  return sheetObj.getRange(row, 2).getValue();
}

function clearResultContents(sheetObj) {
  var x = 9;

  sheetObj.getRange('A'+ x + ':' + 'D999').clear();
  console.log('clear finish.')
}

