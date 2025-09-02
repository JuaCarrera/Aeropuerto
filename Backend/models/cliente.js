const supabase = require('../utils/database');

//creation of "Cliente" model
const Cliente = {
    //method to get a .json list from supabase
    getAll: async() => {
        const { data, error } = await supabase
        .from('clientes')
        .select('id_cliente, nombre, cel, pais, tipo_id, id_number, fecha_nacimiento, correo, rol')
        .order('nombre', { ascending: true });

        if (error) throw error;
        return data;
    }
};

module.exports = Cliente;