# VideoCaptureCard-WebViewer
將擷取卡採集到影像與音頻訊號，透過 WebRTC API 顯示在網頁的`<video>`元素上。  
Capture video and audio signals from the capture card and display them on the `<video>` element of the web page via the WebRTC API.
<br>
    
URL: [https://arce0406.github.io/VideoCaptureCard-WebViewer/](https://arce0406.github.io/VideoCaptureCard-WebViewer/)  


## Scenario
如果你想投放 Nintendo Switch 的畫面到電腦螢幕，有幾種常見的做法。
1. 使用HDMI，從 Nintendo Switch 底座連接到螢幕。
2. 使用擷取卡/擷取盒，然後使用OBS捕捉視訊&音訊。
  
<br>
  
但這些方法對我而言，都不太方便。  
- 直接使用螢幕，除非是特殊螢幕(支援PIP/PBP)，才能把遊戲視窗化，否則是直接佔用掉一個螢幕，需要手動切換訊號來源才能跟電腦一起使用，即使我是雙螢幕也嫌煩。
- 如果透過OBS，就要將訊號輸出到某些播放軟體中，或者串流到影音平台(Youtube、Twitch)上，但幾乎必然會有延遲。
  
<br>
  
我只是自己要用、偶爾分享遊戲畫面給朋友看，並不想直播、也不想要搞得如此複雜、更不希望有延遲。  
> 如果是直播需求，建議還是用高價位的擷取盒，會更加穩定。
  
<br>
  
而如果，跟我一樣，你只是希望...
- 不透過其他軟體與複雜的操作，直接投放 Nintendo Switch 畫面。
- 不想買高貴的擷取盒，但有買(或可以負擔)便宜的 usb 擷取卡(20美金以內)。
- 想要看到視窗化的遊戲畫面，而不是占用整個螢幕。
  
<br>
  
那麼，你可以考慮使用這個網站工具。


## Device Specifications
由於只是概略的做成，可能有無法預期的bug，因此提供我的測試設備：
1. Nintendo Switch（OLED款式）
2. Chrome瀏覽器
3. 擷取卡: [VC01 USB3.0轉HDMI影像擷取卡](https://24h.pchome.com.tw/prod/DCAX3W-A900EQPPF)


## Features
以下為功能一覽表。
> :heavy_check_mark: 表示已完成  
> :x: 表示尚未完成  
  
:heavy_check_mark: 將擷取卡串流顯示在 `<video>` 上。  
:heavy_check_mark: 將 `<video>` 暫停、全螢幕、調整音量、投放到其他裝置。  
:x: 截圖與錄影 (預定於2022/11完成)


## Note
以下為常見問題與注意事項。
1. 需要要是 hdmi 接口的擷取卡才會有聲音輸出。
2. 需要允許網站使用攝影機與麥克風。
3. 如果只有影像或只有聲音，請嘗試重新插拔擷取卡。 
4. 理論上，要接其他掌上型遊戲機，只要是透過擷取卡的方式應該都能正確捕捉，但我沒有測試過，因此若有疑慮請勿衝動消費。