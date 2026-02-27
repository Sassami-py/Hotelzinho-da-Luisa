from flask import Flask, render_template, request
from calculadora import Periodo, Calculadora

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calcular', methods=['POST'])
def calcular():
    data_ini = request.form['entrada']
    data_fim = request.form['saida']
    caes = int(request.form['quantidade'])
    per = Periodo(data_ini, data_fim) 
    calc = Calculadora(caes)
    total = calc.calcular_total(per)
    return render_template('index.html', resultado=total)

if __name__ == '__main__':
    app.run(debug=True)
