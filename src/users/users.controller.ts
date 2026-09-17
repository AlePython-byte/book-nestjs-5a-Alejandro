import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}
@Controller("users")
export class UsersController {

   private users: User[] = [
    {
        id: "1",
        name: "Alejandro",
        email: "alejandro@correo.com"
    },
    {
        id: "2",
        name: "David",
        email: "david@correo.com"
    },
    {
        id: "3",
        name: "Luis",
        email: "luis@correo.com"
    },
    {
        id: "4",
        name: "Jorge",
        email: "jorge@correo.com"
    },
    {
        id: "5",
        name: "Danilo",
        email: "danilo@correo.com"
    },
    {
        id: "6",
        name: "Camila",
        email: "camila@correo.com"
    },
    {
        id: "7",
        name: "Sebastian",
        email: "sebastian@correo.com"
    },
    {
        id: "8",
        name: "Valentina",
        email: "valentina@correo.com"
    },
    {
        id: "9",
        name: "Santiago",
        email: "santiago@correo.com"
    },
    {
        id: "10",
        name: "Laura",
        email: "laura@correo.com"
    }
];
    @Get("")
    getUsers() {
        return this.users;
    }

    @Get(":id")
    getUserById(@Param("id") id: string) {
        console.log(".:: User ID: ", id);
        const user = this.users.find((user) => user.id === id);
        console.log("usuario buscado: ", user)
        return user;
    }

    @Get('search/:name')
    getUserEmailByName(@Param('name') name: string) {
        const data = this.users.find((user) => user.name === name);
        if (data) {
            return {result: data?.email};
        } else {
            return {result: 'User no encontrado'};
        }
    }

    @Post()
    createUser(@Body() userPayload: User) {
        console.log('.:: user: ', userPayload);
        // user.id = no debe existir
        // user.correo = no debe existir
        // si el usuario existe -> retornar "el usuario"
        const data = this.users.find((user) => user.id === userPayload.id || user.email === userPayload.email);
        if(data) {
            return {
            msg: "El usuario ya se encuentra registrado"
            }

        }
        this.users.push(userPayload);
        return {
            msg: 'Usuario creado exitosamente',
            data: userPayload 
        }
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {

        console.log('.:: UserID: ', id);
        const position = this.users.findIndex((user) => user.id === id);
        console.log('.:: Position: ', position);
        this.users.splice(position, 1);
        if (position === -1) {
            return {
                msg: "No existe el ID"
            }
        }

        return {
            msg: "Usuario eliminado con exito"
        }
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userChanges: User) {
        console.log('.:: UserID Update: ', id);
        console.log('.:: UserChanges: ', userChanges);

        const position = this.users.findIndex((user) => user.id === id);
        if (position === -1) {
            return {
                msg: "No existe el ID"
            }
        }

        const existingUser = this.users[position];
        console.log('.:: Existing User: ', existingUser);

        const updatedUser = { ...existingUser, ...userChanges };
        this.users[position] = updatedUser;

        return {
            msg: "Usuario actualizado con exito",
            data: updatedUser
        }
    }

}    
