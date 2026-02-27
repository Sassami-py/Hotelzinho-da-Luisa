from datetime import datetime, date

class periodo:
  def __init__(self, inicio, fim):
    dia_inicial = datetime.strptime(inicio,"%d/%m/%Y")
    dia_final = datetime.strptime(fim,"%d/%m/%Y")
    self.periodo_total = (dia_final - dia_inicial).days +1

class calculadora:
  def __init__(self, quantidade):
    self.valor = 65
    self.quantidade = quantidade

  def calculo(self,obj_periodo):
    self.resultado = obj_periodo.periodo_total * self.quantidade * self.valor
    return self.resultado
