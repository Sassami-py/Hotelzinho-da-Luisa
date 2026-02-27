from datetime import datetime, date

class periodo:
  def __init__(self, inicio, fim):
    dia_inicial = datetime.strptime(inicio,"%Y-%m-%d")
    dia_final = datetime.strptime(fim,"%Y-%m-%d")
    self.periodo_total = (dia_final - dia_inicial).days +1

class calculadora:
  def __init__(self, quantidade,servicos):
    precos = {
    'hospedagem': 65,
    'daycare': 35,
    'passeio': 40
    }
    self.valor = precos.get(servicos, 65)
    self.quantidade = quantidade

  def calculo(self,obj_periodo):
    self.resultado = obj_periodo.periodo_total * self.quantidade * self.valor
    return self.resultado
