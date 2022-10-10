# VideoCaptureCard-WebViewer (Capture Card Viewer)
將擷取卡採集到影像與音頻訊號，透過 WebRTC API 顯示在網頁的`<video>`元素上。  
  
Capture video and audio signals from the capture card and display them on the `<video>` element of the web page via the WebRTC API.  
  
キャプチャカードからビデオ信号と音声信号をキャプチャし、WebRTC APIを介してWebページの`<video>`要素に表示します。  
  
## Guideline
[中文版](README.md)  
[日本語版](README-jp.md)  
[English version](README-en.md)  
  
## Links
[Repository - https://github.com/Arce0406/VideoCaptureCard-WebViewer](https://github.com/Arce0406/VideoCaptureCard-WebViewer)  
[Homepage - https://arce0406.github.io/VideoCaptureCard-WebViewer/](https://arce0406.github.io/VideoCaptureCard-WebViewer/)  

## Scenario
If you want to drop a Nintendo Switch screen onto your computer screen, there are a few common ways to do it.  
1. Use HDMI to connect from the Nintendo Switch dock to the screen.
2. Use a capture card, and use OBS software to capture video & audio.
  
<br>
  
However, these methods are not user-friendly for me.  
- If you connect the Switch directly to the computer screen, unless it is a special screen (supporting PIP/PBP), support you show in sub window. Otherwise, if you want to use it with the computer at the same time, you must manually switch the source of the screen signal, which is very troublesome.
- If you capture through OBS, you have to output the signal to some player software or live broadcast to streaming platforms (such as Youtube, Twitch), which usually has a delay.
  
<br>
  
I just want to use it for myself and occasionally share the game screen to my friends.  
I don't want to make live streaming, and I don't want to have delay.  
> However, if you are looking for live streaming, suggest you to evaluate whether you need a high priced capture box.
  
<br>
  
So, if you are like me and just want to...  
- Want to see a windowed game screen that you can operate with your computer at the same time instead of taking up the whole screen.
- Don't want to go through other software or complicated operations, and want to put Nintendo Switch screen directly.
- Don't want to buy a high priced capture box, but have bought (or can afford) a cheap usb capture card (within $20).
  
<br>
  
Then, you may consider using this web tool.  


## Usage
Here are the steps.  
1. Turn on the Nintendo Switch and connect the HDMI cable.
2. Connect the HDMI to the capture card, and then connect the capture card to your computer.
3. Open the website [https://arce0406.github.io/VideoCaptureCard-WebViewer/](https://arce0406.github.io/VideoCaptureCard-WebViewer/)
4. It shows settings modal in default, specify the video & audio source as the capture card, and the audio output device. 
5. Close the setup modal, and enjoy.



## Device Specifications
Since this is only a rough idea, there may be unpredictable bugs, so I provide my test equipment:  
1. Nintendo Switch（OLED）
2. Browser: Chrome (version 106.0.5249.103)
3. Capture card: [VC01 USB3.0轉HDMI影像擷取卡](https://24h.pchome.com.tw/prod/DCAX3W-A900EQPPF)


## Features
Here is the list of features.  
- :heavy_check_mark: Displays the capture card stream on `<video>`.  
    - Currently can pause, full-screen, turn on/off sound, and open sub-windows.  
- :x: Screenshot (future implementation expected)


## Note
The following are frequently asked questions and notes.  
1. HDMI capture card have both video & audio output, but VGA capture card will only have video output. 
2. You need to allow the website to use the camera and microphone. 
3. If there is only audio (or only video), please try to plug and unplug the capture card again.  
4. Theoretically, you can connect other handheld game machines. It should be able to capture correctly, but I have not tested it, so I do not guarantee that it will work.
