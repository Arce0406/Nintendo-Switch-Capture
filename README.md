# VideoCaptureCard-WebViewer (Capture Card Viewer)
將擷取卡採集到影像與音頻訊號，透過 WebRTC API 顯示在網頁的`<video>`元素上。  
Capture video and audio signals from the capture card and display them on the `<video>` element of the web page via the WebRTC API.
  
  
Github Repo: [https://github.com/Arce0406/VideoCaptureCard-WebViewer](https://github.com/Arce0406/VideoCaptureCard-WebViewer)  
Github Pages: [https://arce0406.github.io/VideoCaptureCard-WebViewer/](https://arce0406.github.io/VideoCaptureCard-WebViewer/)  

## Scenario
如果你想投放 Nintendo Switch 的畫面到電腦螢幕，有幾種常見的做法。
1. 使用HDMI，從 Nintendo Switch 底座連接到螢幕。
2. 使用擷取卡/擷取盒，然後使用OBS捕捉視訊&音訊。
  
<br>
  
但這些方法對我而言，都不太方便。  
- 直接把Switch接上電腦螢幕，除非是特殊螢幕(支援PIP/PBP)，才可能能把遊戲視窗化，否則想同時與電腦使用，必須手動切換螢幕訊號來源，非常麻煩。
- 如果透過OBS擷取，則必須將訊號輸出到某些播放軟體，或者直播到影音平台上(如Youtube、Twitch)，通常都會有延遲。
  
<br>
  
我只是自己要用、偶爾分享遊戲畫面給朋友看，並不想直播、也不想要搞得如此複雜、更不希望有延遲。  
> 但如果是直播需求，建議自己衡量是否需要用高價位的擷取盒。
  
<br>
  
所以，如果你跟我一樣，只是希望...
- 想要看到視窗化的遊戲畫面，可以與電腦同時操作，而不是占用整個螢幕。
- 不想透過其他軟體或複雜的操作，想要直接投放 Nintendo Switch 畫面。
- 不想購買高價位的擷取盒，但有買(或可以負擔)便宜的 usb 擷取卡(20美金以內)。
  
<br>
  
那麼，你可以考慮使用這個網站工具。


## Usage
操作步驟
1. 開啟 Nintendo Switch 電源，並接上 HDMI 線。
2. 將 HDMI 接上擷取卡，再將擷取卡連接到電腦。
3. 開啟網站 [https://arce0406.github.io/VideoCaptureCard-WebViewer/](https://arce0406.github.io/VideoCaptureCard-WebViewer/)
4. 網站預設開啟設定畫面，在此指定影像&聲音來源為擷取卡，並指定好聲音的輸出裝置
5. 關閉設定畫面，即可開始遊戲



## Device Specifications
由於只是概略的做成，可能有無法預期的bug，因此提供我的測試設備：
1. Nintendo Switch（OLED款式）
2. 瀏覽器: Chrome (版本 106.0.5249.103)
3. 擷取卡: [VC01 USB3.0轉HDMI影像擷取卡](https://24h.pchome.com.tw/prod/DCAX3W-A900EQPPF)


## Features
以下為功能一覽表。
<!-- :heavy_check_mark: 表示已完成  
:x: 表示尚未完成   -->
  
- :heavy_check_mark: 將擷取卡串流顯示在 `<video>` 上。  
    - 目前可以暫停、全螢幕化、開啟/關閉聲音以及開啟子母視窗。  
- :x: 截圖 (未來預計實作)


## Note
以下為常見問題與注意事項。
1. 需要是 hdmi 接口的擷取卡才會有聲音輸出，VGA擷取卡只會有影像輸出喔。
2. 需要允許網站使用攝影機與麥克風。
3. 如果只有聲音(或只有影像)，請嘗試重新插拔擷取卡。 
4. 理論上，要接其他掌上型遊戲機，只要是透過擷取卡的方式應該都能正確捕捉，但我沒有測試過，因此不保證一定可行。