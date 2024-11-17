class User {
  id: string;       // id(identificador) tipo Cadena de texto
  name: string;     // name(nombre) tipo Cadena de texto
  email: string;    // email(correo) tipo Cadena de texto
  password: string; // password(contraseña) tipo Cadena de texto
  phone: number;    // phone(numero telefonico) tipo Numerico
  type: string;     // type(tipo de usuario) tipo Cadena de Texto
  registration: string; // registration(registro) tipo Cdena de texto
  age: number;      // age(edad) tipo Numerico
  city: string;     // city(ciudad) tipo Cadena de Texto

  constructor(id: string, name: string, email: string, password: string, phone: number, type: string, registration: string, age: number, city: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.type = type;
    this.registration = registration;
    this.age = age;
    this.city = city;
  }
}

export default User
