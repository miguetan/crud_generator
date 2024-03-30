<template>
    <h2>{{Modelo}}s</h2>    
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>created_at</th>
                    <th>updated_at</th>
                    <th>name</th>
                    <th class="actions">
                        <ion-icon size="large" :icon="addOutline" @click="preNew()"></ion-icon>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí van las filas con los datos de las cámaras -->
                <tr v-for="my{{Modelo}} in {{modelo}}s" :key="my{{Modelo}}.id">
                    <td>{{ my{{Modelo}}.id }}</td>
                    <td>{{ my{{Modelo}}.created_at }}</td>
                    <td>{{ my{{Modelo}}.updated_at }}</td>
                    <td>{{ my{{Modelo}}.name }}</td>
                    <td class="actions">
                        <ion-icon :icon="createOutline" @click="preEdit(my{{Modelo}})" ></ion-icon>
                        <ion-icon id="confirmDestroy{{Modelo}}" :icon="trashOutline" @click="destroy(my{{Modelo}})"></ion-icon>
                    </td>
                </tr>
                <!-- Repetir las filas según sea necesario -->
            </tbody>
        </table>

        <div style="height:40px">
        <ion-icon v-if="current_page > 1" size="large" @click="current_page --" :icon="chevronBack"></ion-icon>
        <ion-icon v-if="current_page < last_page" size="large" style="float: right;" @click="current_page ++" :icon="chevronForward"></ion-icon>
        </div>   
    
        <ion-modal :is-open="isOpen">
          <ion-header>
            <ion-toolbar>
              <ion-title v-if="myModal{{Modelo}}.id !== undefined">
                Camara 
                </ion-title>
              <ion-title v-else>Nueva {{modelo}}</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="save">Guardar</ion-button>
                <ion-button @click="isOpen = false">Cerrar</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <ion-list>
                            <ion-item>
                                <ion-label position="stacked">name</ion-label>
                                <ion-input 
                                        v-model="myModal{{Modelo}}.user" 
                                        placeholder="name" 
                                        type="text"
                                        ></ion-input>
                            </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>
    
    
    
    </template>
    
    <script setup lang="ts">
    import { ref, onMounted,watch } from 'vue';
    import { {{Modelo}}Service } from '@/services/{{Modelo}}Service';
    import {{{Modelo}}} from '@/interfaces/{{Modelo}}';
    import { createOutline, trashOutline, addOutline, chevronBack,chevronForward } from 'ionicons/icons';
    import { alertController, IonLabel,IonIcon,IonTitle,IonButton,IonModal,IonHeader,IonContent,IonToolbar,IonButtons,IonInput,IonItem,IonList, loadingController} from '@ionic/vue';
    import tools from '@/composables/tools';
    
    
    const {{modelo}}s = ref<{{Modelo}}[]>([]);
    const {{modelo}}ToDelete = ref({} as {{Modelo}})
    let myModal{{Modelo}} = ref({} as {{Modelo}})
    let isOpen = ref(false)
    
    let current_page = ref(1)
    let last_page = ref<number>(1) 
    
    const save = async () => {
        tools().showLoading('Guardando {{modelo}}...')
    
        if (myModal{{Modelo}}.value.id === undefined) {
            const my{{Modelo}}:{{Modelo}} = await {{Modelo}}Service.create(myModal{{Modelo}}.value)
            {{modelo}}s.value.push(my{{Modelo}})
        } else {
            const my{{Modelo}}:{{Modelo}} = await {{Modelo}}Service.update(myModal{{Modelo}}.value)
            const index = {{modelo}}s.value.findIndex(({{modelo}}) => {{modelo}}.id === my{{Modelo}}.id);
            {{modelo}}s.value.splice(index, 1, my{{Modelo}});
        }
        isOpen.value = false;
        myModal{{Modelo}}.value = {} as {{Modelo}}
        loadingController.dismiss()
    }
    
    onMounted(async () => {
        get()
    });
    
    
    const preEdit = (my{{Modelo}} : {{Modelo}}) => {
                    isOpen.value = true
                    myModal{{Modelo}}.value = Object.assign({}, my{{Modelo}}); //creamos una copia del objeto
            }
    
    const preNew = () => {
            myModal{{Modelo}}.value = {} as {{Modelo}}
            isOpen.value = true
        }
    
    const destroy = async (my{{Modelo}}:{{Modelo}}) => {
        const alert = await alertController.create({
          header: '¿Estas seguro?',
          subHeader: 'Esta acción es irreversible',
          message: 'Confirma que deseas borrar el {{modelo}} ' + my{{Modelo}}.id,
          buttons:[
                        {
                        text: 'No',
                        role: 'cancel',
                        },
                        {
                        text: 'Si, quiero borrar',
                        role: 'confirm',
                        handler: async() => {
                            console.log(my{{Modelo}})
                            const deleted = await {{Modelo}}Service.destroy(my{{Modelo}})
                            if(deleted)
                                {{modelo}}s.value = {{modelo}}s.value.filter(function(_my{{Modelo}}:{{Modelo}}){ return _my{{Modelo}}.id != my{{Modelo}}.id })
                        },
                        },
                    ],
        });
    
        await alert.present();
    }

    const get = async () => {
        const resp = await AulaService.getAll(current_page.value, myFilterAula.value);
        if(resp?.data)
        {
            aulas.value = resp.data
            current_page.value = resp.current_page
            last_page.value = resp.last_page
        }
    }  

    watch(current_page, get);
    watch(myFilterAula, get, { deep: true });

    </script>
    
    <style scoped>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    
    th {
        border: 0px solid #eee;
        padding-bottom: 0.6rem;
    }
    
    td {
        border: 1px solid #eee;
        padding: 4px;
        text-align: left;
        }
    
    tr:hover {
        background-color: #f2f2f2;
    }
    
    .actions {
        display: flex;
        justify-content: flex-end;
    }
    
    .actions ion-icon {
        margin-left: 0.6rem;
    }
    
    </style>