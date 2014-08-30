function Init() {
}

Init.current_activity_init = function() {
    if (!localStorage['current_activity']) {
        localStorage['current_activity'] = JSON.stringify([]);
    }
};

Init.activities_init = function() {
    if (!localStorage['activities']) {
        localStorage['activities'] = JSON.stringify([]);
    }
};

Init.signing_up_activity_init = function () {
    if (!localStorage['signing_up']) {
        localStorage['signing_up'] = JSON.stringify([]);
    }
};

Init.messages_init = function() {
    if (!localStorage['messages']) {
        localStorage['messages'] = JSON.stringify([]);
    }
};

Init.prices_init = function() {
    if (!localStorage['prices']) {
        localStorage['prices'] = JSON.stringify([]);
    }
};

Init.current_price_init = function() {
    if (!localStorage['current_price']) {
        localStorage['current_price'] = JSON.stringify([]);
    }
};

Init.price_signing_up_init = function() {
    if (!localStorage['price_signing_up']) {
        localStorage['price_signing_up'] = JSON.stringify([]);
    }
};

Init.price_messages_init = function() {
    if (!localStorage['price_messages']) {
        localStorage['price_messages'] = JSON.stringify([]);
    }
};