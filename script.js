// =========================================
// 設定エリア
// =========================================
const CONFIG = {
    padding: 40,    // 端の余白
    minDistance: 50 // 数字同士が近づきすぎない距離
};

// かなリスト（あ〜ん）
const HIRAGANA = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split("");

// =========================================
// メイン処理
// =========================================

window.onload = function() {
    generateNumbers();
};

function generateNumbers() {
    const area = document.getElementById('play-area');
    const levelSelect = document.getElementById('level-select');
    const mode = levelSelect.value;

    area.innerHTML = ''; // クリア

    // モードに応じた表示リストを作成
    let items = [];
    
    if (mode === 'easy') {
        // 初級: 1〜10
        for (let i = 1; i <= 10; i++) items.push(i);

    } else if (mode === 'normal-num') {
        // 中級: 1〜20
        for (let i = 1; i <= 20; i++) items.push(i);

    } else if (mode === 'normal-mix') {
        // 中級混合: 1,あ,2,い... (数字10まで)
        for (let i = 1; i <= 10; i++) {
            items.push(i);
            items.push(HIRAGANA[i-1]);
        }

    } else if (mode === 'hard-mix') {
        // 上級混合: 1,あ,2,い... (数字20まで)
        for (let i = 1; i <= 20; i++) {
            items.push(i);
            items.push(HIRAGANA[i-1]);
        }
    }

    // エリアサイズ取得
    const areaWidth = area.clientWidth;
    const areaHeight = area.clientHeight;
    const positions = [];

    // アイテムを配置
    items.forEach(text => {
        const numDiv = document.createElement('div');
        numDiv.className = 'number-item';
        numDiv.textContent = text; // 数字または文字を入れる

        // ランダム配置ロジック
        let x, y, overlap;
        let attempts = 0;

        do {
            overlap = false;
            x = Math.random() * (areaWidth - CONFIG.padding * 2) + CONFIG.padding / 2;
            y = Math.random() * (areaHeight - CONFIG.padding * 2) + CONFIG.padding / 2;

            // 重なりチェック
            for (const pos of positions) {
                const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
                if (distance < CONFIG.minDistance) {
                    overlap = true;
                    break;
                }
            }
            attempts++;
        } while (overlap && attempts < 200);

        positions.push({ x: x, y: y });

        numDiv.style.left = x + 'px';
        numDiv.style.top = y + 'px';

        area.appendChild(numDiv);
    });
}