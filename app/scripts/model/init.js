function current_activity_init() {
    if (!localStorage['current_activity']) {
        localStorage['current_activity'] = JSON.stringify([]);
    }
};

function activities_init() {
    if (!localStorage['activities']) {
        localStorage['activities'] = JSON.stringify([]);
    }
};

function signing_up_activity_init() {
    if (!localStorage['signing_up']) {
        localStorage['signing_up'] = JSON.stringify([]);
    }
};

function messages_init() {
    if (!localStorage['messages']) {

        localStorage['messages'] = JSON.stringify([]);
    }
};

function prices_init() {
    if (!localStorage['prices']) {

        localStorage['prices'] = JSON.stringify([]);
    }
};

function current_price_init() {
    if (!localStorage['current_price']) {

        localStorage['current_price'] = JSON.stringify([]);
    }
};

function price_signing_up_init() {
    if (!localStorage['price_signing_up']) {

        localStorage['price_signing_up'] = JSON.stringify([]);
    }
};