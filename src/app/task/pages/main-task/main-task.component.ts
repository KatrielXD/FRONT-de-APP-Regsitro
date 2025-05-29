import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css']
})
export class MainTaskComponent implements OnInit{
  tasks: Array<any> = [];
  user: any; 
  miFormulario: FormGroup = this.formBuilder.group({
    newTask: [""]
  });  

  constructor(private crudService: CrudService, private router: Router, private formBuilder: FormBuilder){}

  ngOnInit(){
      this.user = this.crudService.user;
      this.crudService.read().subscribe((res) =>{        
        this.tasks = res.tareas1;
      });
  }

  create(){
    console.log()
    this.crudService.create(this.miFormulario.value.newTask).subscribe((response) => {

      this.miFormulario.reset();

      this.crudService.read().subscribe((res) =>{        
        this.tasks = res.tareas1;
      });
    })
  }

  update(task: any){

    const {_id, nombre} = task;

    this.router.navigateByUrl(`/task/${_id}/${nombre}`)
  }

  delete(id: string){
    Swal.fire({
      title: '¿Quieres eliminar este registro?',
      showDenyButton: true,      
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',        
        confirmButton: 'order-1',
        denyButton: 'order-1',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.crudService.delete(id).subscribe({
          next: () => {
            this.crudService.read().subscribe({
              next: (res) => {                  
               this.tasks = res.tareas1;           
              }
            })
          },
          error: er => {
            console.log(er)
          } 
        })        
      }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/auth");
  }


}
