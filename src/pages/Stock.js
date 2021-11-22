import React, { useEffect, useState } from "react";

function Stock() {
  //儲存api fetch回來的資料狀態
  const [returnApi, setReturnApi] = useState([]);
  //日期狀態
  const [dataNew, setDataNew] = useState("");
  //代號狀態
  const [numberCode, setNumberCode] = useState("");
  //抓取股市api

  async function fetchFunction() {
    try {
      const response = await fetch(
        `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${dataNew}&stockNo=${numberCode}`
      );
      const json = await response.json();
      //轉換的結果寫入狀態
      setReturnApi(json);
    } catch (err) {
      throw err;
    }
  }

//   useEffect(() => {
//     fetchFunction();
//   }, []);

  return (
    <>
      <p>日期</p>
      <input
        type="text"
        onChange={(e) => {
          setDataNew(e.target.value);
        }}
        value={dataNew} //控制顯示的值
      />
      <p>代號</p>
      <input
        type="text"
        onChange={(e) => {
          setNumberCode(e.target.value);
        }}
        value={numberCode} //控制顯示的值
      />
        <br />
      <button onClick={()=>{
          fetchFunction();
      }}>查詢</button>
      <table>
        <tr>
          {returnApi.fields &&
            returnApi.fields.map((v, i) => <th key={i}>{v}</th>)}
        </tr>

        {/* 雙map */}
        {returnApi.data &&
          returnApi.data.map((v, i) => (
            <tr key={i}>
              {v.map((v, i) => (
                <td key={i}>{v}</td>
              ))}
            </tr>
          ))}
      </table>
    </>
  );
}

export default Stock;
