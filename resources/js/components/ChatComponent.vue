<template>
    <div
        class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
        <div class="w-full max-w-md">
            <div>
                <img
                    class="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                />
                <h2
                    class="my-6 text-center text-3xl font-bold tracking-tight text-gray-900"
                >
                    Welcome {{ authStore.me?.name }}
                </h2>
            </div>
            <div
                id="chat_container"
                class="h-[200px] p-3 text-sm overflow-y-auto border border-gray-300 rounded-none rounded-t-md"
            >
                <div v-for="message in messages">
                    <span
                        v-if="authStore.me.id === message.user_id"
                        class="font-medium italic"
                    >
                        Me:
                    </span>
                    <span v-else class="font-medium">
                        {{ message.username }}:
                    </span>
                    {{ message.message }}
                </div>
            </div>
            <form @submit.prevent="createMessage">
                <div class="shadow-sm">
                    <div class="flex">
                        <input
                            id="message"
                            name="email"
                            v-model="form.message"
                            required=""
                            class="relative block w-full appearance-none rounded-none rounded-bl-md border-l border-r border-b border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Type your message"
                        />
                        <button
                            class="px-3 border-t border-gray-300 rounded-br-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </form>
            <div class="mt-10">
                <button
                    @click="logout"
                    class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store";
import { onMounted, reactive, ref, Ref, nextTick } from "vue";
import { Message } from "../client/models/Message";
import MessageService from "../client/services/MessageService";
import Echo from "laravel-echo";

const authStore = useAuthStore();

const messages: Ref<Message[]> = ref([]);

const form = reactive({
    message: "",
});

onMounted(() => {
    MessageService.getMessages()
        .then((msgs) => {
            messages.value = msgs;
            nextTick(() => {
                chatConatinerScrollToBottom();
            });
        })
        .catch((error) => {
            console.log("error fetching messages: ", error);
        });

    const echo = new Echo({
        broadcaster: "pusher",
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        wsHost: import.meta.env.VITE_PUSHER_HOST
            ? import.meta.env.VITE_PUSHER_HOST
            : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
        wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
        wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
        forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? "https") === "https",
        enabledTransports: ["ws", "wss"],
    });

    echo.private("chat").listen("MessageSent", (e) => {
        messages.value.push(e.message);
        nextTick(() => {
            chatConatinerScrollToBottom();
        });
    });
});

const createMessage = () => {
    MessageService.createMessage(form)
        .then((msg) => {
            form.message = "";
        })
        .catch((error) => {
            console.log("error creating msg: ", error);
        });
};

const chatConatinerScrollToBottom = () => {
    document.getElementById("chat_container").scrollTop =
        document.getElementById("chat_container").scrollHeight;
};

const logout = () => {
    authStore.logout();
};
</script>
