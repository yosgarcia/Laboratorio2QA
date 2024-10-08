import { Library } from './library';
import { Book } from './book';
import { Author } from './author';
import { mock, when, instance } from 'ts-mockito';


/* CASOS DE PRUEBA PARA CLASE BOOK
 * 
 * CASO DE PRUEBA 3:
 *  Nombre: Validar cuando se busca por nombre del autor los libros de dicho autor
 *          y el autor si tiene libros en una libreria.
 *  Objetivo: Se buscar validar que la función searchByAuthor de la clase Library
 *            si devuelva correctamente la lista de los libros de ese autor cuando
 *            la librería si tiene dichos libros
 *  Datos de prueba:
 *      - book1:
 *            titulo = 'Harry Potter'
 *            nombre autor = 'J.k. Rowling'
 *      - book2:
 *            titulo = 'Caminos de la vida'
 *            nombre autor = 'Pedro Gomez'
 *      - Nombre a Buscar: 'J.k. Rowling'
 *  Resultado esperado: Al hacer el llamado a la función searchByAuthor, esta debería retornar 
 *                      una lista de libros con el autor usado, por lo que para este caso, 
 *                       se debería obtener que el tamaño de la lista debería ser igual a
 *                      la cantidad de libros de dicho autor en la libreria.
 * 
 * 
 * CASO DE PRUEBA 4:
 *  Nombre: Validar cuando se busca por nombre del autor los libros de dicho autor
 *          y el autor no ningún libro en la libreria.
 *  Objetivo: Se buscar validar que la función searchByAuthor de la clase Library
 *            si se comporta adecuadamente cuando se busca los libros de un autor 
 *            cuando la librería no tiene ningún libro de dicho autor
 *  Datos de prueba:
 *      - book1:
 *            titulo = 'Harry Potter'
 *            nombre autor = 'J.k. Rowling'
 *      - Nombre a Buscar: 'Jeff Kinney'
 *  Resultado esperado: Al hacer el llamado a la función searchByAuthor, esta debería retornar 
 *                      una lista de libros vacia ya que no existe ningún libro en esa librería
 *                      que tenga un autor con nombre igual al nombre buscado.
 * 
 */


describe('Clase Library', () => {
  let author1: Author;
  let author2: Author;
  let library: Library;
  let nombreAutor = 'J.k. Rowling';

  beforeEach(() => {
    author1 = mock<Author>();
    author2 = mock<Author>();
    
    library = new Library();

  });

  it('3. Buscar por autor un libro que SI se encuentra en la libreria ', () => {
    when(author1.getName()).thenReturn(nombreAutor);
    when(author2.getName()).thenReturn('Pedro Gomez');

    let mockito1 = instance(author1);
    let mockito2 = instance(author2);

    let book1 = new Book('Harry Potter', mockito1, 4);
    let book2 = new Book('Caminos de la vida', mockito2, 2);

    library.addBook(book1);
    library.addBook(book2);

    let response = library.searchByAuthor(nombreAutor);
    expect(response.size()).toBe(1);
    

  });


  it('4. Buscar por autor un libro que NO se encuentra en la libreria ', () => {
    when(author1.getName()).thenReturn(nombreAutor);

    let mockito = instance(author1);

    let book1 = new Book('Harry Potter', mockito, 4);

    library.addBook(book1);
    let nameToSearch = 'Jeff Kinney';

    let response = library.searchByAuthor(nameToSearch);
    expect(response.size()).toBe(0);
    

  });


});
