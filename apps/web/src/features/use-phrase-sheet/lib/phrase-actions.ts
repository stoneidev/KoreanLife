export async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
}

export function speakKorean(text: string) {
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'ko-KR'
  utter.rate = 0.85
  speechSynthesis.cancel()
  speechSynthesis.speak(utter)
}
