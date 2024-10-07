import { Book } from './book';
import { Author } from './author';
import { mock, when, instance } from 'ts-mockito';


/* CASOS DE PRUEBA PARA CLASE BOOK
 * 
 * CASO DE PRUEBA 1:
 *  Nombre: Verificación de que dos libros son iguales en tanto el nombre como el titulo
 *  Objetivo: Se buscar validar que la función equals de la clase Book esté 
 *            validando correctamente cuando dos libros coinciden tanto en el
 *            título como en el nombre del autor, por lo que debería ser el mismo libro.
 *  Datos de prueba:
 *      - book1:
 *            titulo = 'Cien años de soledad'
 *            nombre autor = 'Gabriel García Márquez'
 *      - book2:
 *            titulo = 'Cien años de soledad'
 *            nombre autor = 'Gabriel García Márquez'
 *  Resultado esperado: Al hacer el llamado a la función equals, esta debería retornar 
 *                      true ya que tanto el titulo como el nombre del autor son los 
 *                      mismos.
 * 
 * CASO DE PRUEBA 2:
 *  Nombre: Verificación de que dos libros son diferentes en el titulo
 *  Objetivo: Se buscar validar que la función equals de la clase Book esté 
 *            validando correctamente cuando dos libros no coincidan en el
 *            título pero si en el nombre del autor
 *  Datos de prueba:
 *      - book1:
 *            titulo = 'Cien años de soledad'
 *            nombre autor = 'Gabriel García Márquez'
 *      - book2:
 *            titulo = 'El amor en los tiempos del cólera'
 *            nombre autor = 'Gabriel García Márquez'
 *  Resultado esperado: Al hacer el llamado a la función equals, esta debería retornar 
 *                      false ya que tienen títulos diferentes entre ellos, por lo que 
 *                      no son el mismo libro.
 * 
 */


describe('Clase Book', () => {
  
  let autor1: Author;
  let autor2: Author;

  let book1: Book;
  let book2: Book;

  let nombreAutor = 'Gabriel García Márquez';


  beforeEach(() => {
    autor1 = mock<Author>();
    autor2 = mock<Author>();
  });

  it('1. Verifica que dos libros son iguales tanto en titulo como en el nombre del author', () => {
    when(autor1.equals(nombreAutor)).thenReturn(true);
    when(autor2.getName()).thenReturn(nombreAutor);

    let mockito1 = instance(autor1);
    let mockito2 = instance(autor2);

    book1 = new Book('Cien años de soledad', mockito1, 5);
    book2 = new Book('Cien años de soledad', mockito2, 5);

    let response = book1.equals(book2)

    expect(response).toBe(true);
  });

  it('2. Verifica que dos libros sean diferentes en el titulo', () => {

    when(autor1.equals(nombreAutor)).thenReturn(true);
    when(autor2.getName()).thenReturn(nombreAutor);

    let mockito1 = instance(autor1);
    let mockito2 = instance(autor2);

    book1 = new Book('Cien años de soledad', mockito1, 5);
    book2 = new Book('El amor en los tiempos del cólera', mockito2, 5);

    let response = book1.equals(book2)

    expect(response).toBe(false);
  });

});
