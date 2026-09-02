export const landingPage = String.raw`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="NH FIT 직원용 상담 Copilot UI 프로토타입">
  <title>NH FIT · 상담 Copilot 데모</title>
  <style>
    :root{--g:#159447;--gd:#087235;--lime:#91c52b;--ink:#18221c;--muted:#66716a;--line:#e2e8e3;--bg:#f3f6f3;--white:#fff;--amber:#a76300;--blue:#2874c6;--shadow:0 16px 42px rgba(24,66,36,.07)}
    *{box-sizing:border-box}body{margin:0;min-width:320px;color:var(--ink);background:var(--bg);font:14px/1.5 Pretendard,"Noto Sans KR",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}button,select{font:inherit}button{cursor:pointer}button:focus-visible,select:focus-visible{outline:3px solid #ffca28;outline-offset:2px}.topline{padding:7px 20px;color:#536057;background:#e4ebe5;text-align:center;font-size:11px}header{background:#fff;border-bottom:1px solid var(--line)}.top{height:66px;display:flex;align-items:center;justify-content:space-between;gap:20px}.wrap{width:min(calc(100% - 40px),1440px);margin:auto}.brand{display:flex;align-items:center;gap:10px;color:var(--gd);font-size:20px;font-weight:850}.logo{width:35px;height:35px;display:grid;place-items:center;border-radius:11px;color:#fff;background:linear-gradient(145deg,var(--lime),var(--g));font-size:12px;box-shadow:0 6px 15px #15944730}.product{padding-left:12px;border-left:1px solid var(--line);color:#48524b;font-size:13px;font-weight:700}.header-right{display:flex;align-items:center;gap:10px}.status{padding:6px 10px;border-radius:99px;color:var(--gd);background:#e8f6eb;font-size:11px;font-weight:750}.ghost,.primary,.choice{padding:9px 13px;border-radius:10px;font-weight:700}.ghost{border:1px solid var(--line);color:#4f5a52;background:#fff}.primary{border:0;color:#fff;background:var(--g)}
    main{padding:24px 0 48px}.toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}.case-title{display:flex;align-items:center;gap:11px}.case-title h1{margin:0;font-size:21px;letter-spacing:-.03em}.case-id{padding:5px 8px;border-radius:7px;color:#5c675f;background:#e8ede9;font:700 11px ui-monospace,monospace}.tools{display:flex;gap:8px}select{padding:9px 32px 9px 12px;border:1px solid var(--line);border-radius:10px;color:#4f5a52;background:#fff}
    .workspace{display:grid;grid-template-columns:minmax(300px,.82fr) minmax(380px,1.3fr) minmax(290px,.86fr);gap:16px;align-items:start}.panel{overflow:hidden;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:var(--shadow)}.panel-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:17px 19px;border-bottom:1px solid var(--line)}.panel-head h2{margin:0;font-size:15px}.sub{color:var(--muted);font-size:11px}.live{display:flex;align-items:center;gap:6px;color:var(--g);font-size:11px;font-weight:750}.dot{width:7px;height:7px;border-radius:50%;background:var(--g);box-shadow:0 0 0 4px #15944716}
    .transcript{height:500px;overflow:auto;padding:18px}.time{text-align:center;color:#8a948d;font-size:10px}.msg{max-width:88%;margin:14px 0}.msg.staff{margin-left:auto}.who{margin:0 0 5px;color:var(--muted);font-size:10px}.bubble{padding:12px 14px;border-radius:5px 15px 15px 15px;background:#f0f4f0}.staff .bubble{border-radius:15px 5px 15px 15px;color:#fff;background:#258b4a}.bubble p{margin:0}.listening{margin-top:18px;padding:12px;border:1px dashed #a9d2b1;border-radius:12px;color:var(--gd);background:#f0faf2;font-size:12px}.input-box{padding:14px 18px;border-top:1px solid var(--line)}.input-box textarea{width:100%;min-height:70px;resize:vertical;padding:10px;border:1px solid var(--line);border-radius:10px;font:inherit}.speaker-row{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}.speaker-row select{padding:6px 28px 6px 9px}.input-actions{display:flex;gap:7px;margin-top:8px;flex-wrap:wrap}.input-actions button{flex:1;min-width:74px}.input-actions button:disabled{cursor:not-allowed;opacity:.5}.error{color:#a12525}.success{color:var(--gd)}
    .center{display:grid;gap:16px}.runtime{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line)}.metric{padding:14px;background:#fff}.metric b{display:block;margin-top:3px;font-size:13px}.signal-list{padding:8px 18px}.signal{padding:15px 0;border-bottom:1px solid #edf0ed}.signal:last-child{border:0}.signal-top{display:flex;align-items:center;justify-content:space-between;gap:12px}.signal-name{font-weight:750}.pill{padding:4px 8px;border-radius:99px;font:750 10px ui-monospace,monospace}.supported{color:var(--gd);background:#e7f5ea}.possible{color:var(--amber);background:#fff2dd}.confidence{height:5px;margin:10px 0 8px;border-radius:9px;background:#e9edea}.confidence span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--g),var(--lime))}.evidence{margin:0;color:var(--muted);font-size:11px}.trajectory{display:flex;align-items:center;gap:6px;margin-top:8px;color:#718078;font-size:10px}.trajectory strong{color:var(--amber)}.trajectory .now{color:var(--gd)}
    .clarify{padding:20px;border:1px solid #b7dcbc;border-radius:16px;background:linear-gradient(145deg,#f4fbf5,#fff)}.kicker{margin:0 0 7px;color:var(--g);font-size:10px;font-weight:850;letter-spacing:.08em}.clarify h2{margin:0 0 7px;font-size:17px}.clarify>p:not(.kicker){margin:0;color:var(--muted);font-size:12px}.question{margin:16px 0;padding:14px;border-left:3px solid var(--g);background:#fff;font-weight:700}.choices{display:flex;gap:7px}.choice{flex:1;border:1px solid var(--line);color:#4e5951;background:#fff}.choice.use{border-color:var(--g);color:#fff;background:var(--g)}
    .right{display:grid;gap:16px}.opportunity{padding:17px 18px;border-bottom:1px solid var(--line)}.opportunity:last-child{border:0}.op-head{display:flex;align-items:start;justify-content:space-between;gap:10px}.opportunity h3{margin:0;font-size:14px}.code{margin-top:3px;color:#879089;font:700 9px ui-monospace,monospace}.opportunity p{margin:10px 0;color:var(--muted);font-size:11px}.review{display:flex;align-items:center;gap:6px;color:var(--blue);font-size:10px;font-weight:700}.handoff{padding:18px}.handoff dl{display:grid;grid-template-columns:74px 1fr;gap:9px;margin:0;font-size:11px}.handoff dt{color:var(--muted)}.handoff dd{margin:0;font-weight:650}.handoff .primary{width:100%;margin-top:16px}.notice{padding:15px 18px;border-top:1px solid var(--line);color:#606b63;background:#f8faf8;font-size:10px}.debug summary{padding:14px 18px;font-weight:700;cursor:pointer}.trace{margin:0;padding:0 18px 16px;list-style:none;color:#66736a;font:10px/1.8 ui-monospace,monospace}
    .disclaimer{margin-top:18px;padding:13px 16px;border-radius:12px;color:#59655d;background:#e8eee9;font-size:11px}.disclaimer strong{color:var(--gd)}
    @media(max-width:1100px){.workspace{grid-template-columns:1fr 1fr}.right{grid-column:1/-1;grid-template-columns:1fr 1fr}.transcript{height:580px}}@media(max-width:720px){.wrap{width:calc(100% - 24px)}.product,.status{display:none}.toolbar{align-items:start;flex-direction:column}.workspace{grid-template-columns:1fr}.right{grid-column:auto;grid-template-columns:1fr}.transcript{height:auto;max-height:520px}.runtime{grid-template-columns:1fr 1fr}.choices{flex-wrap:wrap}.choice{min-width:45%}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
  </style>
</head>
<body>
  <div class="topline">로컬 PoC · 기본 오프라인 분석 · 실제 고객 시스템과 연결되지 않음</div>
  <header><div class="top wrap"><div class="brand"><span class="logo">NH</span>NH FIT <span class="product">직원용 상담 Copilot</span></div><div class="header-right"><span class="status">● 로컬 Runtime 정상</span><button class="ghost" type="button">감사 로그</button></div></div></header>
  <main class="wrap">
    <div class="toolbar"><div class="case-title"><h1>실시간 상담 지원</h1><span class="case-id">DEMO-001</span></div><div class="tools"><select aria-label="데모 시나리오"><option>생활비 부담 상담</option><option>초기화된 새 상담</option></select><button class="ghost" type="button">시나리오 초기화</button></div></div>
    <div class="workspace">
      <section class="panel" aria-labelledby="transcript-title"><div class="panel-head"><h2 id="transcript-title">상담 대화</h2><span class="live"><span class="dot"></span>분석 중</span></div><div class="transcript"><p class="time">오늘 15:42 · 합성 시나리오</p>
        <div class="msg"><p class="who">고객</p><div class="bubble"><p>최근 병원비가 예상보다 많이 나가서 이번 달 생활비가 빠듯해졌어요. 자동이체 날짜를 놓칠까 걱정됩니다.</p></div></div>
        <div class="msg staff"><p class="who">직원</p><div class="bubble"><p>갑작스러운 지출 때문에 부담이 있으셨군요. 어떤 자동이체가 가장 신경 쓰이시나요?</p></div></div>
        <div class="msg"><p class="who">고객</p><div class="bubble"><p>카드대금이랑 통신비요. 다음 주 급여가 들어오면 괜찮은데, 그 전까지 며칠이 비어요.</p></div></div>
        <div class="msg staff"><p class="who">직원</p><div class="bubble"><p>급여일 전까지의 일정과 납부 상황을 함께 확인해 보겠습니다.</p></div></div>
        <div class="msg"><p class="who">고객</p><div class="bubble"><p>지난달에도 비슷했는데 연체는 하지 않았어요. 당장 상품 가입보다는 놓치는 납부가 없었으면 좋겠어요.</p></div></div>
        <div class="listening" id="stt-status">Fake STT 또는 브라우저 음성 인식을 시작하세요.</div>
      </div><div class="input-box"><div class="speaker-row"><label for="utterance"><b>상담 발화 입력</b></label><label>화자 <select id="speaker" aria-label="현재 화자"><option value="고객">고객</option><option value="직원">직원</option></select></label></div><textarea id="utterance" maxlength="2000" placeholder="합성 상담 문장을 입력하세요"></textarea><div class="input-actions"><button class="ghost" id="mic-start" type="button">🎙 시작</button><button class="ghost" id="mic-pause" type="button" disabled>일시정지</button><button class="ghost" id="mic-stop" type="button" disabled>종료</button><button class="ghost" id="fake-stt" type="button">Fake STT</button><button class="primary" id="analyze" type="button">발화 추가</button></div></div></section>
      <div class="center">
        <section class="panel" aria-label="런타임 상태"><div class="runtime"><div class="metric"><span class="sub">입력 지연</span><b id="latency">대기</b></div><div class="metric"><span class="sub">최근 이벤트</span><b id="event">발화 #05</b></div><div class="metric"><span class="sub">입력 제공자</span><b id="input-provider">Fake STT</b></div><div class="metric"><span class="sub">분석 제공자</span><b id="analysis-provider">확인 중</b></div></div></section>
        <section class="panel" aria-labelledby="signals-title"><div class="panel-head"><div><h2 id="signals-title">활성 신호</h2><span class="sub">대화 근거에 따라 상태가 갱신됩니다</span></div><span class="sub" id="signal-count">2개 감지</span></div><div class="signal-list" id="signal-list">
          <article class="signal"><div class="signal-top"><span class="signal-name">단기 현금흐름 공백</span><span class="pill supported">SUPPORTED</span></div><div class="confidence"><span style="width:86%"></span></div><p class="evidence">근거: “다음 주 급여가 들어오면… 그 전까지 며칠이 비어요.”</p><div class="trajectory"><span>발화 #01</span><strong>POSSIBLE</strong><span>→</span><span>발화 #03</span><strong class="now">SUPPORTED</strong></div></article>
          <article class="signal"><div class="signal-top"><span class="signal-name">반복 납부 부담</span><span class="pill possible">POSSIBLE</span></div><div class="confidence"><span style="width:58%"></span></div><p class="evidence">근거: “지난달에도 비슷했는데 연체는 하지 않았어요.”</p><div class="trajectory"><span>발화 #05에서 최초 감지 · 추가 확인 필요</span></div></article>
        </div></section>
        <section class="clarify" aria-labelledby="clarify-title"><p class="kicker">HIGHEST-VALUE CLARIFICATION</p><h2 id="clarify-title">한 가지를 더 확인해 보세요</h2><p>지원 방향을 좁히는 데 가장 정보 가치가 높은 질문입니다.</p><div class="question" id="clarification">“급여일 전에 예정된 카드대금과 통신비의 납부일을 각각 확인해도 될까요?”</div><div class="choices"><button class="choice use" id="use-question" type="button">활용</button><button class="choice" id="later-question" type="button">나중에</button><button class="choice" id="skip-question" type="button">건너뛰기</button></div></section>
      </div>
      <aside class="right" aria-label="지원 검토">
        <section class="panel" aria-labelledby="opportunities-title"><div class="panel-head"><div><h2 id="opportunities-title">지원 기회</h2><span class="sub">직원 검토 후 안내</span></div></div><div id="opportunities">
          <article class="opportunity"><div class="op-head"><div><h3>납부 부담 완화 검토</h3><div class="code">BURDEN_RELIEF</div></div><span class="pill supported">우선</span></div><p>납부 일정과 급여일 간 공백을 확인하고, 고객이 놓치지 않도록 가능한 지원 절차를 검토합니다.</p><span class="review">✓ 상품 추천 아님 · 직원 검토 필요</span></article>
          <article class="opportunity"><div class="op-head"><div><h3>미납 예방 지원 검토</h3><div class="code">DEBT_RECOVERY</div></div><span class="pill possible">후보</span></div><p>현재 연체로 단정하지 않고, 반복되는 일정 부담을 줄일 수 있는 안내가 필요한지 확인합니다.</p><span class="review">✓ 금리·한도·승인 여부 제시 안 함</span></article></div>
        </section>
        <section class="panel" aria-labelledby="handoff-title"><div class="panel-head"><h2 id="handoff-title">상담 메모 초안</h2><span class="sub">Mock handoff</span></div><div class="handoff"><dl><dt>고객 의도</dt><dd id="memo-intent">급여일 전 납부 누락 예방</dd><dt>확인된 사실</dt><dd id="memo-facts">다음 주 급여 예정, 현재 연체 진술 없음</dd><dt>추가 확인</dt><dd id="memo-verify">카드대금·통신비 납부일</dd><dt>제안 다음 단계</dt><dd id="memo-next">일정 확인 후 지원 절차 검토</dd></dl><button class="primary" id="handoff" type="button">직원 검토함에 전달</button></div><div class="notice" id="handoff-status">전달 버튼은 데모 동작입니다. 외부 시스템이나 실제 고객 기록에 저장되지 않습니다.</div></section>
        <details class="panel debug"><summary>Debug · Audit trace</summary><ul class="trace"><li>provider_adapter fake-stt (local)</li><li>15:42:08 transcript_event #03</li><li>15:42:08 signal CASHFLOW_GAP → SUPPORTED</li><li>15:42:31 transcript_event #05</li><li>15:42:31 opportunity BURDEN_RELIEF emitted</li><li>15:42:32 clarification ranked: 0.84</li></ul></details>
      </aside>
    </div>
    <div class="disclaimer"><strong>AI는 판단하거나 승인하지 않습니다.</strong> 표시된 신호와 지원 기회는 상담 직원을 돕는 검토 자료이며, 고객 분류·상품 추천·금융 결정이 아닙니다. 입력은 로컬 분석이 기본이며 외부 제공자는 서버 환경에서 명시적으로 설정한 경우에만 사용됩니다.</div>
  </main>
  <script>
    const transcript = document.querySelector('.transcript');
    const input = document.querySelector('#utterance');
    const status = document.querySelector('#stt-status');
    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const speaker = document.querySelector('#speaker');
    const startButton = document.querySelector('#mic-start');
    const pauseButton = document.querySelector('#mic-pause');
    const stopButton = document.querySelector('#mic-stop');
    let eventNumber = 5;
    let recognition = null;
    let sessionActive = false;
    let sessionPaused = false;
    let restartTimer = null;
    let analysisTimer = null;
    let customerTranscript = [];
    const appendMessage = (role, text) => {
      const item = document.createElement('div');
      item.className = role === '직원' ? 'msg staff' : 'msg';
      item.innerHTML = '<p class="who">' + role + '</p><div class="bubble"><p>' + escapeHtml(text) + '</p></div>';
      transcript.insertBefore(item, status);
      transcript.scrollTop = transcript.scrollHeight;
    };
    const render = (data) => {
      document.querySelector('#analysis-provider').textContent = data.provider === 'local-rules' ? '로컬·오프라인' : '외부 LLM';
      document.querySelector('#signal-count').textContent = data.signals.length + '개 감지';
      document.querySelector('#signal-list').innerHTML = data.signals.length ? data.signals.map((signal) => '<article class="signal"><div class="signal-top"><span class="signal-name">' + escapeHtml(signal.label) + '</span><span class="pill ' + (signal.state === 'SUPPORTED' ? 'supported' : 'possible') + '">' + escapeHtml(signal.state) + '</span></div><div class="confidence"><span style="width:' + Math.round(signal.confidence * 100) + '%"></span></div><p class="evidence">근거: ' + escapeHtml(signal.evidence) + '</p></article>').join('') : '<p class="sub">현재 근거로 감지된 신호가 없습니다.</p>';
      document.querySelector('#clarification').textContent = '“' + data.clarification + '”';
      document.querySelector('#opportunities').innerHTML = data.opportunities.length ? data.opportunities.map((op) => '<article class="opportunity"><div class="op-head"><div><h3>' + escapeHtml(op.label) + '</h3><div class="code">' + escapeHtml(op.code) + '</div></div><span class="pill supported">검토</span></div><p>' + escapeHtml(op.reason) + '</p><span class="review">✓ 상품 추천 아님 · 직원 검토 필요</span></article>').join('') : '<div class="opportunity"><p>추가 확인 후 지원 기회를 표시합니다.</p></div>';
      document.querySelector('#memo-intent').textContent = data.handoff.intent;
      document.querySelector('#memo-facts').textContent = data.handoff.facts;
      document.querySelector('#memo-verify').textContent = data.handoff.verify;
      document.querySelector('#memo-next').textContent = data.handoff.nextStep;
    };
    const analyzeTranscript = async (text) => {
      if (!text) return;
      status.textContent = '누적 고객 발화를 분석 중입니다…'; status.className = 'listening';
      const started = performance.now();
      try {
        const response = await fetch('/api/analyze', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({transcript:text})});
        if (!response.ok) throw new Error('analysis failed');
        render(await response.json());
        document.querySelector('#latency').textContent = Math.round(performance.now() - started) + ' ms';
        status.textContent = sessionActive && !sessionPaused ? '상담을 계속 듣는 중입니다…' : '분석 완료 · 다음 발화를 기다립니다.'; status.className = 'listening success';
      } catch { status.textContent = '분석에 실패했습니다. 대화는 보존되며 다시 시도할 수 있습니다.'; status.className = 'listening error'; }
    };
    const scheduleAnalysis = () => {
      clearTimeout(analysisTimer);
      analysisTimer = setTimeout(() => analyzeTranscript(customerTranscript.join(' ')), 900);
    };
    const commitUtterance = (text, role) => {
      const clean = text.trim();
      if (!clean) return;
      appendMessage(role, clean); eventNumber += 1;
      document.querySelector('#event').textContent = '발화 #' + String(eventNumber).padStart(2, '0');
      if (role === '고객') { customerTranscript.push(clean); scheduleAnalysis(); }
      else { status.textContent = '직원 발화를 기록했습니다. 고객 발화 분석은 계속됩니다.'; }
    };
    const analyze = () => {
      const text = input.value.trim();
      if (!text) { status.textContent = '추가할 합성 발화를 입력하세요.'; status.className = 'listening error'; return; }
      input.value = ''; commitUtterance(text, speaker.value);
    };
    document.querySelector('#analyze').addEventListener('click', analyze);
    document.querySelector('#fake-stt').addEventListener('click', () => { const text = speaker.value === '고객' ? '다음 주 급여일 전까지 카드대금과 통신비 납부가 걱정돼요.' : '납부 예정일을 차례로 확인해 보겠습니다.'; document.querySelector('#input-provider').textContent = 'Fake STT'; commitUtterance(text, speaker.value); status.textContent = 'Fake STT 발화를 대화에 추가했습니다.'; });
    const setControls = () => { startButton.disabled = sessionActive && !sessionPaused; pauseButton.disabled = !sessionActive; pauseButton.textContent = sessionPaused ? '계속 듣기' : '일시정지'; stopButton.disabled = !sessionActive; };
    const startRecognition = () => {
      if (!recognition || !sessionActive || sessionPaused) return;
      try { recognition.start(); } catch { status.textContent = '음성 인식 재시작을 기다리는 중입니다…'; }
    };
    startButton.addEventListener('click', () => {
      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Recognition) { document.querySelector('#input-provider').textContent = 'Fake STT fallback'; status.textContent = '이 브라우저는 음성 인식을 지원하지 않아 Fake STT를 사용합니다.'; document.querySelector('#fake-stt').click(); return; }
      const accepted = window.confirm('브라우저 음성 인식은 브라우저 또는 운영체제 제공자의 외부 음성 처리 서비스를 사용할 수 있습니다. 합성 데이터만 사용하고 계속할까요?');
      if (!accepted) { status.textContent = '음성 인식을 취소했습니다. 로컬 Fake STT를 사용할 수 있습니다.'; return; }
      recognition = new Recognition(); recognition.lang = 'ko-KR'; recognition.interimResults = true; recognition.continuous = true;
      recognition.onstart = () => { status.textContent = speaker.value + ' 발화를 계속 듣는 중입니다…'; document.querySelector('#input-provider').textContent = 'Browser STT · 연속'; };
      recognition.onresult = (event) => { let interim = ''; for (let index = event.resultIndex; index < event.results.length; index += 1) { const result = event.results[index]; const text = result[0].transcript; if (result.isFinal) commitUtterance(text, speaker.value); else interim += text; } input.value = interim; };
      recognition.onerror = (event) => { if (event.error === 'no-speech' && sessionActive) { status.textContent = '말소리가 없어 계속 대기합니다…'; return; } sessionActive = false; sessionPaused = false; setControls(); status.textContent = '음성 인식 오류(' + event.error + ') · 발화는 보존되며 Fake STT를 사용할 수 있습니다.'; status.className = 'listening error'; };
      recognition.onend = () => { if (sessionActive && !sessionPaused) { status.textContent = '음성 인식을 자동으로 다시 연결하는 중입니다…'; clearTimeout(restartTimer); restartTimer = setTimeout(startRecognition, 250); } };
      sessionActive = true; sessionPaused = false; setControls(); startRecognition();
    });
    pauseButton.addEventListener('click', () => { if (!sessionActive) return; sessionPaused = !sessionPaused; clearTimeout(restartTimer); if (sessionPaused) { recognition.stop(); status.textContent = '상담 음성 인식을 일시정지했습니다. 대화와 분석 결과는 보존됩니다.'; } else { status.textContent = '상담 음성 인식을 다시 시작합니다…'; startRecognition(); } setControls(); });
    stopButton.addEventListener('click', () => { sessionActive = false; sessionPaused = false; clearTimeout(restartTimer); if (recognition) recognition.stop(); recognition = null; input.value = ''; setControls(); status.textContent = '상담 음성 인식을 종료했습니다. 누적 대화와 분석 결과는 보존됩니다.'; });
    speaker.addEventListener('change', () => { status.textContent = '현재 화자를 ' + speaker.value + '(으)로 변경했습니다.'; });
    document.querySelector('#use-question').addEventListener('click', () => { const question = document.querySelector('#clarification').textContent.replace(/[“”]/g, ''); appendMessage('직원', question); status.textContent = '추가 질문을 상담 대화에 반영했습니다.'; });
    document.querySelector('#later-question').addEventListener('click', () => { status.textContent = '추가 질문을 나중에 검토하도록 보류했습니다.'; });
    document.querySelector('#skip-question').addEventListener('click', () => { status.textContent = '추가 질문을 건너뛰었습니다.'; });
    document.querySelector('#handoff').addEventListener('click', () => { const node = document.querySelector('#handoff-status'); node.textContent = 'Mock handoff 완료 · 브라우저 메모리에만 반영되었습니다.'; node.className = 'notice success'; });
    document.querySelectorAll('.toolbar .ghost')[0].addEventListener('click', () => location.reload());
    fetch('/health').then((response) => response.json()).then((data) => { document.querySelector('#analysis-provider').textContent = data.provider === 'local-rules' ? '로컬·오프라인' : '외부 LLM'; }).catch(() => { document.querySelector('#analysis-provider').textContent = '연결 오류'; });
  </script>
</body>
</html>`;
