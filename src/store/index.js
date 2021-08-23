import {createStore} from 'vuex'
import axios from 'axios';
import globalFetch from '../plugins/globalFetch'

export default createStore({
    state: {
        userAuth: '',
        user: null,
        respawn: false,
        allUsers: null,
        currentEnemy: 0,
        enemyHealth: 100,
        selectedWeapon: {},
        selectedArmor: {},
        shop: [
            {
                name: 'light armor',
                defence: 3,
                price: 50,
                sellPrice: 10,
                image: 'https://ae01.alicdn.com/kf/H5d2402eadd3d46bd85bd11d2902a9fd7n/Medieval-Retro-Men-Soldier-Combat-Equestrian-Leather-Armor-Stage-British-Style-Knight-Vest-Carnival-Party-Cosplay.jpg_q50.jpg',
                type: 'armor'
            },
            {
                name: 'medium armor',
                defence: 7,
                price: 250,
                sellPrice: 800,
                image: 'https://cdna.artstation.com/p/assets/images/images/005/117/806/large/ricardo-graham-hlaalu-medium-armor-realtime-01.jpg?1488587496',
                type: 'armor'
            },
            {
                name: 'heavy armor',
                defence: 8,
                price: 800,
                sellPrice: 300,
                image: 'https://cdnb.artstation.com/p/assets/images/images/007/762/749/large/brush-dog-heavy-armor.jpg?1508345305',
                type: 'armor'
            },
            {
                name: 'sword',
                damage: 8,
                price: 40,
                sellPrice: 5,
                special: 'has 20% chance to block enemy attack',
                image: 'https://mcishop.azureedge.net/mciassets/w_5_0033535_caledfwlch-sword_550.png',
                type: 'weapon'
            },
            {
                name: 'bow',
                damage: 6,
                price: 300,
                sellPrice: 80,
                special: 'has 30% chance to do double damage',
                image: 'https://i.pinimg.com/originals/d7/1e/ee/d71eee64c550d1f052572142d121d0c4.png',
                type: 'weapon'
            },
            {
                name: 'magic wand',
                damage: 5,
                price: 1000,
                sellPrice: 400,
                special: 'has 40% chance to heal hero on enemy attack by 10hit points',
                image: 'https://i.pinimg.com/originals/f8/7a/a3/f87aa38e3692c1a6267086150b577168.jpg',
                type: 'weapon'
            },
            {
                name: 'small potion',
                heals: 20,
                price: 10,
                sellPrice: 5,
                image: 'https://www.seekpng.com/png/detail/233-2339047_health-potions-are-red-zelda-red-potion.png',
                type: 'potion'
            },
            {
                name: 'medium potion',
                heals: 35,
                price: 30,
                sellPrice: 10,
                image: 'https://www.pngkit.com/png/detail/441-4412466_potion-of-healing-png-image-royalty-free-download.png',
                type: 'potion'
            },
            {
                name: 'large potion',
                heals: 50,
                price: 60,
                sellPrice: 20,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiAnXe609zb5cVg9xjlcM2Yp9VrV_AUVqJjw&usqp=CAU',
                type: 'potion'
            },
        ],
        enemies: [
            {
                name: "Goblin",
                img: "https://metagalaxia.com.br/wp-content/uploads/2018/10/Os-personagens-goblin-slayer-goblins.jpg",
                maxDamage: 12
            },
            {
                name: "Goblins",
                img: "https://dailystormer.su/wp-content/uploads/2019/05/goblins-12.jpeg",
                maxDamage: 16
            },
            {
                name: "Goblin-King",
                img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cd6c7bc4-7d67-42b7-9ea8-ba3815491ed0/dcw1q1f-b5ce8b22-91bf-483e-90ed-7718f4ae79f4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NkNmM3YmM0LTdkNjctNDJiNy05ZWE4LWJhMzgxNTQ5MWVkMFwvZGN3MXExZi1iNWNlOGIyMi05MWJmLTQ4M2UtOTBlZC03NzE4ZjRhZTc5ZjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TMDw4bRr4oc2tyK-qllP75osdxyDNRMrtTprZ3iq-Zs",
                maxDamage: 18
            }
        ],
    },
    mutations: {
        setUserAuth(state, payload) {
            state.userAuth = payload
        },
        setAllUsers(state, payload) {
            state.allUsers = payload
        },
        setUser(state, payload) {
            state.user = payload
        },
        respawn(state, payload) {
            state.respawn = payload
        },
        nextEnemy(state) {
            state.currentEnemy = Math.floor(Math.random() * state.enemies.length)
            state.enemyHealth = 100
        },
        selectArmor(state, payload) {
            state.selectedArmor = payload
        },
        selectWeapon(state, payload) {
            state.selectedWeapon = payload
        },
        damageEnemy(state, payload) {
            state.enemyHealth -= payload
            if (state.enemyHealth <= 0) {
                state.currentEnemy = Math.floor(Math.random() * 3)
                state.enemyHealth = 100
            }
        }
    },
    actions: {
        async getAllUsers({commit}) {
            let data = await axios.get('http://localhost:3000/user/getAllUsers')
            commit('setAllUsers', data.data)
        },
        async setUserFetch({state, commit}) {
            if (state.userAuth) {
                let data = await axios.get('http://localhost:3000/user/currentUser', {
                    headers: {
                        'Content-Type': 'application/json',
                        'userauth': state.userAuth
                    }
                })
                commit('setUser', data.data)
            }
        },

        async updateUserGold({state, dispatch}, payload) {
            await globalFetch('http://localhost:3000/user/updateUserGold', state.userAuth, {gold: payload})
            dispatch('setUserFetch')
        },
        async updateUserHealth({state, dispatch}, payload) {
            await globalFetch('http://localhost:3000/user/updateUserHealth', state.userAuth, {health: payload})
            dispatch('setUserFetch')
        },
        async addItemToInventory({state, dispatch}, payload) {
            await globalFetch('http://localhost:3000/user/addItemToInventory', state.userAuth, {item: payload})
            dispatch('setUserFetch')
        },
        async removeItemFromInventory({state, dispatch}, payload) {
            await globalFetch('http://localhost:3000/user/removeItemFromInventory', state.userAuth, {item: payload})
            dispatch('setUserFetch')
        },
        async resetUserStats({state, commit, dispatch}) {
            await globalFetch('http://localhost:3000/user/resetUser', state.userAuth, null)
            dispatch('setUserFetch')
            commit('respawn', !state.respawn)
        },
    },
    modules: {}
})
