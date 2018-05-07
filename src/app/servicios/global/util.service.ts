import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    constructor() { }

    public listarAnios(): any[] {
        return [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927, 1900];
    }

    public listarMeses(): any[] {
        return [
            { value: 1, label: 'Enero' },
            { value: 2, label: 'Febrero' },
            { value: 3, label: 'Marzo' },
            { value: 4, label: 'Abril' },
            { value: 5, label: 'Mayo' },
            { value: 6, label: 'Junio' },
            { value: 7, label: 'Julio' },
            { value: 8, label: 'Agosto' },
            { value: 9, label: 'Septiembre' },
            { value: 10, label: 'Octubre' },
            { value: 11, label: 'Noviembre' },
            { value: 12, label: 'Diciembre' },
        ];
    }

    public listarDias(): any[] {
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    }

}