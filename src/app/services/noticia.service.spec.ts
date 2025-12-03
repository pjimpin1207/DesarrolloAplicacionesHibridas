import { TestBed } from '@angular/core/testing';
import { NoticiaService } from './noticia.service';

describe('NoticiaService', () => {
  let service: NoticiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test para getNoticiaPorId()
  it('should return a noticia by ID', () => {
    const primera = service.getNoticias()[0]; // obtener una noticia existente

    const encontrada = service.getNoticiaPorId(primera.id);

    expect(encontrada).toBeTruthy();
    expect(encontrada?.id).toBe(primera.id);
    expect(encontrada?.titulo).toBe(primera.titulo);
  });

  // Caso cuando NO existe
  it('should return undefined if noticia does not exist', () => {
    const resultado = service.getNoticiaPorId(999999);
    expect(resultado).toBeUndefined();
  });

});
