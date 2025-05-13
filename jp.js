// v-20250513
// Observe the join panel for dynamic content changes (e.g., when switching between login, join, reset views)
function observeJoinPanel(callback) {
    const panelSelector = '.w-reset.w-editor-bem-EditorApp_Panel';
    const panelRoot = document.querySelector(panelSelector);

    if (panelRoot) {
        const observer = new MutationObserver((mutations) => {
            callback();
        });
        observer.observe(panelRoot, { childList: true, subtree: true });
        console.log('✅ Observer attached to join panel');
        callback();
    } else {
        console.log('⏳ Waiting for join panel...');
        setTimeout(() => observeJoinPanel(callback), 1000);
    }
}

// Translate join/login panel elements to Japanese
function replaceJoinPanelTranslations() {
    console.log('🔔 Running replaceJoinPanelTranslations');

    const textNodeMap = {
        'First Name': '名',
        'Last Name': '姓',
        'Email': 'メールアドレス',
        'Password': 'パスワード',
        'Join now': '今すぐ参加',
        'Join as a user in the Editor to start managing this website': '基本情報をご記入し、アカウント登録を行なってください。',
        'You will only access the Editor for this website\.': '「今すぐ参加」をクリックすると、画面が編集画面に切り替わります。',
        'Log in to manage your site\.': 'ログインしてサイトを管理する',
        'Forgot it\?': 'リセット',
        'Forgot your password\?': 'リセット',
        'Log in': 'ログイン',
        'Send Reset': 'リセット用リンクを送信',
        'Return to Log In': 'ログイン画面に戻る'
    };

    document.querySelectorAll('div, span, label, button, h1, input[placeholder]').forEach(el => {
        if (el.isContentEditable || el.contains(document.activeElement)) return;

        el.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                let updatedText = node.textContent;
                Object.keys(textNodeMap).forEach(key => {
                    const regex = new RegExp(key);
                    if (regex.test(updatedText)) {
                        updatedText = updatedText.replace(regex, textNodeMap[key]);
                        console.log(`✅ Replaced join panel text: ${key} → ${textNodeMap[key]}`);
                    }
                });
                node.textContent = updatedText;
            }
        });

        if (el.placeholder) {
            Object.keys(textNodeMap).forEach(key => {
                if (el.placeholder.includes(key)) {
                    el.placeholder = el.placeholder.replace(new RegExp(key), textNodeMap[key]);
                    console.log(`✅ Replaced join panel placeholder: ${key} → ${textNodeMap[key]}`);
                }
            });
        }
    });
}

// Wait for Editor pages to be fully loaded before translating repeatedly
function waitForEditorLoad(callback) {
    if (document.title.includes("Editor:")) {
        console.log("✅ Detected Editor title, starting interval");
        callback();
    } else {
        console.log("⏳ Waiting for Editor title...");
        setTimeout(() => waitForEditorLoad(callback), 1000);
    }
}

// Translate generic Webflow Editor interface elements to Japanese
function replaceEditorTranslations() {
    console.log("🔔 Running replaceEditorTranslations");

    const textNodeMap = {
        "Not Published": "未公開",
        "Published": "公開中",
        "Draft": "下書き",
        "Paste Video URL": "動画のURL(YouTube)を貼ってください",
        "Archived": "アーカイブ中",
        "Queued to publish": "公開待ち",
        "保存 draft": "下書き保存",
        "保存 as draft": "下書きとして保存",
        "保存 changes": "内容を保存",
        "images left": "枚アップロード可能",
        "Select an option": "選択してください",
        "Save changes": "内容を保存",
        "Edit Alt Text": "代替テキスト編集",
        "Republish": "再公開",
        "Queue to publish": "公開待ちに追加",
        "Unpublished Changes": "件の未公開変更箇所",
        "Unpublish": "非公開にする",
        "Schedule": "スケジュール",
        "Remove from queue": "公開待ちから削除",
        "Exit Without Saving\\?": "保存せずに終了しますか？",
        "You are about to close this item with unsaved changes\\. Would you like to save these changes before closing\\?": "保存されていない変更があります。閉じますか？",
        "Discard Changes": "変更を破棄",
        "Keep editing": "編集を続ける",
        "Publish": "公開",
        "Publish Now": "公開",
        "Save": "保存",
        "Save Draft": "下書き保存",
        "Create": "作成",
        "Delete": "削除",
        "Cancel": "キャンセル",
        "Duplicate": "複製",
        "Archive": "アーカイブする",
        "Filter": "フィルター",
        "Select": "選択",
        "Deselect": "選択解除",
        "Export": "エクスポート",
        "New": "新規",
        "Search": "検索",
        "Title": "タイトル",
        "Status": "ステータス",
        "Created": "作成日",
        "Modified": "更新日",
        "Are you sure you want to log out\\?": "本当にログアウトしますか？",
        "Yes, log me out": "はい、ログアウトします",
        "Back to live site": "編集画面を閉じる",
        "View Site": "サイトを見る",
        "Pages": "ページ",
        "Collections": "データベース",
        "Forms": "フォーム",
        "Orders": "注文",
        "Ecommerce": "Eコマース",
        "Name": "名前",
        "Slug": "スラッグ",
        "Status: Not Published": "ステータス：未公開",
        "Status: Published": "ステータス：公開中",
        "Status: Draft": "ステータス：下書き",
        "Status: Archived": "ステータス：アーカイブ中",
        "Status: Queued to publish": "ステータス：公開待ち",
        "Drag your image here": "ここに画像をドラッグ",
        "or click to browse for a file": "またはクリックしてファイルを選択",
        "Replace": "差し替え",
        "Remove": "削除",
        "Add More Images": "画像を追加",
        "Drag images here": "ここに画像をドラッグ",
        "or, click to browse": "またはクリックして選択",
        "Drag your images here": "ここに画像をドラッグ",
        "or click to browse for files": "またはクリックして複数ファイルを選択",
        "Static ページ": "静的ページ",
        "Search 売買物件...": "売買物件を検索...",
        "Search pages...": "ページを検索..."
    };

    const selectors = [
        "span[data-text=\"true\"][data-sc=\"Text\"]",
        "[data-automation-id]",
        "[role=\"button\"]",
        "button",
        "div",
        "span",
        "label",
        "h2",
        "input[placeholder]"
    ];

    document.querySelectorAll(selectors.join(",")).forEach(el => {
        if (el.isContentEditable || el.contains(document.activeElement)) return;

        el.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                let updatedText = node.textContent;
                Object.keys(textNodeMap).forEach(key => {
                    const regex = new RegExp(`\\b${key}\\b`, "g");
                    if (regex.test(updatedText)) {
                        updatedText = updatedText.replace(regex, textNodeMap[key]);
                        console.log(`✅ Replaced text: ${key} → ${textNodeMap[key]}`);
                    }
                });
                node.textContent = updatedText;
            }
        });

        if (el.placeholder) {
            Object.keys(textNodeMap).forEach(key => {
                if (el.placeholder.includes(key)) {
                    el.placeholder = el.placeholder.replace(new RegExp(`\\b${key}\\b`, "g"), textNodeMap[key]);
                    console.log(`✅ Replaced placeholder: ${key} → ${textNodeMap[key]}`);
                }
            });
        }
    });
}

// Kick off translations on load for Editor view and Join/Login view
window.addEventListener("load", () => {
    waitForEditorLoad(() => {
        setInterval(() => {
            replaceEditorTranslations();
        }, 1000);
        console.log("✅ Running replaceEditorTranslations every 1000ms on Editor page");
    });

    observeJoinPanel(() => {
        replaceJoinPanelTranslations();
    });
    setInterval(() => {
        replaceJoinPanelTranslations();
    }, 2000);
});
