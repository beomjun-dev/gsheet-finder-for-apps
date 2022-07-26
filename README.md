# gsheet-finder-for-apps
Google apps script for spreadsheet apps that cannot search for entire sheets.

![gsheet-finder-for-apps](https://user-images.githubusercontent.com/108355517/181060920-0f9090cc-90ea-4dfa-9318-baf76262def7.png)

### Preview Screen
![image](https://user-images.githubusercontent.com/108355517/181061398-113655c3-fb4f-4a55-81c6-32734763d432.png)
![image](https://user-images.githubusercontent.com/108355517/181062294-c6c8baf1-e52b-482c-8706-912ad04536bf.png)

### Description
안드로이드 스프레드시트 앱에서는 Ctrl + F 기능을 통한 시트 전체 검색 기능이 지원되지 않아, <br>
Google Apps Script를 실행하여 검색결과를 표시하는 기능이 구현되어 있습니다.

1. 빨간 박스(A2) 셀에 검색할 문자열을 입력
2. 드롭박스(B2) 메뉴에서 '검색' 을 선택
3. 주황 박스(A7) 셀 하위에 검색 결과 출력
   - 현재 모든 시트는 동일한 형식의 포맷으로 작성되어 있고, '항목' 열의 contents를 표시하도록 구현되어 있음.
   - 스크립트 수행중에는 C2 셀에 '검색 중...'이 표시되고, 수행이 완료되면 c2 셀의 '검색 중...' 문자열 제거됨.
4. 드롭박스(B2) 메뉴에서 '결과지우기' 를 선택
   - 주황 박스(A7) 셀 하위에 모든 검색 결과가 제거됨.
   - 스크립트 수행중에 '결과지우기' 를 선택하면 제거된 후에 진행중이던 검색 결과가 표시되므로 사용 시 주의.
   
### known Issue
- 검색 도중, '최대 실행 시간 초과' 라는 이유로 검색이 끝나기 전에 종료되는 케이스가 있음.
  - 비정상 여부는 검색 결과 맨 아래 '검색 결과 총 N개' 문자열 표시 여부로 판단.
- 결과지우기 도중, '최대 실행 시간 초과' 라는 이유로 지우기가 끝나기 전에 종료되는 케이스가 있음.
  - 비정상 여부는 C2 셀에 '검색 중...' 문자열이 남아있거나, 검색 결과가 남아 있는 지 여부로 판단.
