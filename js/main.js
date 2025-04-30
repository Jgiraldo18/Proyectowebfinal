// Clase para gestionar pacientes
class GestorPacientes {
    constructor() {
      this.pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
      this.formulario = document.getElementById('formularioPaciente');
      this.lista = document.getElementById('listaPacientes');
      this.init();
    }
  
    init() {
      this.cargarPacientes();
      this.formulario.addEventListener('submit', (e) => this.manejarSubmit(e));
    }
  
    cargarPacientes() {
      this.lista.innerHTML = '';
      this.pacientes.forEach((paciente, index) => {
        const li = document.createElement('li');
        li.className = 'paciente-item';
        li.innerHTML = `
          <div class="paciente-info">
            <p><strong>Nombre:</strong> ${paciente.nombre}</p>
            <p><strong>Edad:</strong> ${paciente.edad} años</p>
            <p><strong>Motivo:</strong> ${paciente.motivo}</p>
          </div>
          <div class="paciente-acciones">
            <button class="btn-editar" data-index="${index}">✏️ Editar</button>
            <button class="btn-eliminar" data-index="${index}">🗑️ Eliminar</button>
          </div>
        `;
        this.lista.appendChild(li);
      });
  
      // Agregar eventos a los botones
      document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => this.eliminarPaciente(e.target.dataset.index));
      });
  
      document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (e) => this.editarPaciente(e.target.dataset.index));
      });
    }
  
    manejarSubmit(e) {
      e.preventDefault();
      const nombre = this.formulario.nombre.value.trim();
      const edad = this.formulario.edad.value.trim();
      const motivo = this.formulario.motivo.value.trim();
  
      if (!nombre || !edad || !motivo) {
        alert('⚠️ Por favor completa todos los campos');
        return;
      }
  
      const paciente = { nombre, edad, motivo };
      const estaEditando = this.formulario.querySelector('button[type="submit"]').dataset.editing;
  
      if (estaEditando !== undefined) {
        this.pacientes[estaEditando] = paciente;
      } else {
        this.pacientes.push(paciente);
      }
  
      this.guardarPacientes();
      this.formulario.reset();
      this.formulario.querySelector('button[type="submit"]').textContent = 'Registrar Paciente';
      delete this.formulario.querySelector('button[type="submit"]').dataset.editing;
    }
  
    eliminarPaciente(index) {
      if (confirm('¿Estás seguro de eliminar este paciente?')) {
        this.pacientes.splice(index, 1);
        this.guardarPacientes();
      }
    }
  
    editarPaciente(index) {
      const paciente = this.pacientes[index];
      this.formulario.nombre.value = paciente.nombre;
      this.formulario.edad.value = paciente.edad;
      this.formulario.motivo.value = paciente.motivo;
  
      const submitBtn = this.formulario.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Actualizar';
      submitBtn.dataset.editing = index;
    }
  
    guardarPacientes() {
      localStorage.setItem('pacientes', JSON.stringify(this.pacientes));
      this.cargarPacientes();
    }
  }
  
  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    new GestorPacientes();
  });