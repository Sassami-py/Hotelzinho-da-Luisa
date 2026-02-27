from flask import Flask, render_template, request
from calculadora import Periodo, Calculadora
import urllib.parse 

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calcular', methods=['POST'])
def calcular():

    servico = request.form.get('servico')
    nome_cliente = request.form.get('nome_cliente')
    nomes_pets = request.form.get('nomes_pets')
    quantidade = int(request.form.get('quantidade', 1))
    data_ini = request.form.get('data_inicio')
    data_fim = request.form.get('data_fim')
    endereco = request.form.get('endereco', 'Não informado')

    if not data_fim:
        data_fim = data_ini

    per = Periodo(data_ini, data_fim)
    calc = Calculadora(quantidade, servico) 
    total = calc.calculo(per)               

    texto_base = (
        f"Olá! Gostaria de confirmar uma reserva:\n"
        f"👤 Cliente: {nome_cliente}\n"
        f"🐾 Pets: {nomes_pets}\n"
        f"🛠 Serviço: {servico.capitalize()}\n"
        f"📅 Período: {data_ini} até {data_fim}\n"
        f"💰 Valor Estimado: R$ {total:.2f}"
    )
    
    if servico == 'passeio':
        texto_base += f"\n📍 Endereço: {endereco}"

    mensagem_url = urllib.parse.quote(texto_base)

    return render_template(
        'index.html', 
        resultado=f"{total:.2f}", 
        mensagem_zap=mensagem_url
    )

if __name__ == '__main__':
    app.run(debug=True)
